---
title: "qbf: A QBE Based Brainfuck Compiler"
date: 2026-07-17
shouldFeature: true
excerpt: "With a new found interest in programming languages and compiler (yet again), I embarked on a short journey to write an honest to god compiler that produces a native executable. With the knowledge I gained from completing the first interpreter from Crafting Interpreters and the help of a new friend, QBE, I was able to successfully implement a simple yet complete* brainfuck compiler. In zig btw."
draft: false
tags: ["zig", "compilers", "qbe"]
---

I was following along the [Crafting Interpreters](https://craftinginterpreters.com/)
book when I saw an article on [lobste.rs](https://lobste.rs/) about someone using
[QBE](https://c9x.me/compile/) to make a calculator. I didn't really think anything
about it at the time. A few days later I finished the first interpreter from the
book. I didn't wanna start the second interpreter right away because I wanted to do
it in [zig](https://ziglang.org/) and needed to get myself familiar with zig(again).

Then I remembered that article. The author talked about going through the Crafting Interpreter
book as well as [Writing An Interpreter In Go](https://interpreterbook.com/). The author
wanted something more. In his words:

> What these two books didn't teach me was how to translate source code to native machine code. Enter: QBE.

The article is a fun read. Its called [Overengineered calculator: Zig + QBE](https://tomekw.com/overengineered-calculator-zig-qbe/).

As I said before, my motivation was to get familiar with zig, especially the new [IO](https://ziglang.org/download/0.16.0/release-notes.html#IO-as-an-Interface)
that was not there the last time I tired zig. So, this was a perfect little detour before
tacking the bytecode interpreter in zig. I get to apply the knowledge I picked up and I get
to learn QBE.

With that exposition complete, lets get into the story.

## Understanding the Enemy
Brainfuck is a really simple language. You have a certain number of cells
(usually 30000 or more), a pointer to manipulate the data in those cells, an instruction
pointer and 8 simple commands.
- `+` increments the cell value pointed by the data pointer
- `-` decrements the cell value pointed by the data pointer
- `>` moves the data pointer to the right
- `<` moves the data pointer to the left
- `.` output the value at cell pointed to by data pointer
- `,` request one byte of input and puts it in the cell pointed by the data pointer
- `[` if the value pointed by data pointer is 0, instruction pointer moves to the instruction after the matching `]`
- `]` if the value pointed by data pointer is non zero, instruction pointer moves to the instruction after the matching `[`.

For a proper explanation of brainfuck, read [the specs](https://brainfuck.org/brainfuck.html).

The only bit of complexity comes from the `[` and `]` instruction pairs (ignoring the details
of input/output model and ignore I did).

## Parsing the Enemy
First the structure. The parser would output a list of these `Nodes`.
```zig
pub const Node = struct {
    tag: Tag,
    match: u32,

    pub const Tag = enum {...};
};
```
The tag is the type of command it is and match field is only relevant to `[` and `]`. It
stores the index of the matching `[` or `]` in the list. This is later used by interpreter
to move the instruction pointer to the relevant instruction and by the emitter to form
the correct labels and jump instructions.

With this structure, parsing is really simple. For the 6 instructions we just output the Node
with the correct tag. Finding the matching pair is also really simple with the help of an
old friend: ***recursion***.

```zig
fn parseLoopOpen(p: *Parser) Error!void {
    p.index += 1;
    const pos = p.step;
    p.step += 1;
    try p.reprs.append(p.gpa, .{ .tag = .open_bracket, .match = pos });
    const match = try p.parseBody(p.step - 1);
    p.reprs.items(.match)[pos] = match;
}

fn parseBody(p: *Parser, match: ?u32) Error!u32 {
    while (!p.isAtEnd()) {
        switch (p.source[p.index]) {
            '+' => try p.addNode(.plus),
            '-' => try p.addNode(.minus),
            '<' => try p.addNode(.less),
            '>' => try p.addNode(.greater),
            '.' => try p.addNode(.dot),
            ',' => try p.addNode(.comma),
            '[' => try p.parseLoopOpen(),
            ']' => {
                const m = match orelse return Error.UnmatchedClosingBracket;
                p.index += 1;
                p.step += 1;
                try p.reprs.append(p.gpa, .{ .tag = .close_bracket, .match = m });
                return p.step - 1;
            },
            else => p.index += 1,
        }
    }
    if (match != null) return error.UnmatchedOpeningBracket;
    return p.step;
}
```

This is basically all the code for the parser aside from some helpers and a public function that calls into these function.

## Emitting the Enemy
I'm gonna be honest, I don't know much about QBE or most of the code generation stuff. Since this venture was just me getting familiar with zig, I didn't really focus on understanding this part very much. Luckily for me, QBE's intermediate
language was really simple and equally simple was brainfuck. 

So all I needed to do was convert the parser's output to QBE's IL and pass it to
QBE. The brainfuck commands mapped to simple 2 or 3 instructions of QBE like loading
a value, perform some operation on it and storing it.

For example, the + command maps to following zig code that produces QBE
instructions:
```zig
try e.addInstructionFmt("    %.{d} =l add $tape, %dptr", .{step});
try e.addInstructionFmt("    %.{d} =l loadub %.{d}", .{ step + 1, step });
try e.addInstructionFmt("    %.{d} =l add 1, %.{d}", .{ step + 2, step + 1 });
try e.addInstructionFmt("    storeb %.{d}, %.{d}", .{ step + 2, step });
```

We get the address of the cell data pointer points to, load the value, add 1 to it
and store it back.

Other instructions also map similarly to QBE's IL. The `.` and `,` instructions call
`putchar` and `getchar` respectively.

```zig
.dot => {
    try e.addInstructionFmt("    %.{d} =l add $tape, %dptr", .{step});
    try e.addInstructionFmt("    %.{d} =l loadub %.{d}", .{ step + 1, step });
    try e.addInstructionFmt("    call $putchar(w %.{d})", .{step + 1});
    step += 2;
},
.comma => {
    try e.addInstructionFmt("    %.{d} =l add $tape, %dptr", .{step});
    try e.addInstructionFmt("    %.{d} =l call $getchar()", .{step + 1});
    try e.addInstructionFmt("    storeb %.{d}, %.{d}", .{ step + 1, step });
    step += 2;
},
```

Like with parsing, little bit of challenge comes when it comes to `[` and `]`
instructions. But we did that little bit of hard work when parsing. Here, we just
use the `Node.match` value to define a loop label and based on the condition, we
just to appropriate label.

```zig
.open_bracket => {
    try e.addInstructionFmt("    %.{d} =l add $tape, %dptr", .{step});
    try e.addInstructionFmt("    %.{d} =l loadub %.{d}", .{ step + 1, step });
    try e.addInstructionFmt("    jnz %.{d}, @LOOP{d}, @LOOP{d}", .{ step + 1, i, matches[i] });
    try e.addInstructionFmt("@LOOP{d}", .{i});
    step += 2;
},
.close_bracket => {
    try e.addInstructionFmt("    %.{d} =l add $tape, %dptr", .{step});
    try e.addInstructionFmt("    %.{d} =l loadub %.{d}", .{ step + 1, step });
    try e.addInstructionFmt("    jnz %.{d}, @LOOP{d}, @LOOP{d}", .{ step + 1, matches[i], i });
    try e.addInstructionFmt("@LOOP{d}", .{i});
    step += 2;
},
```

QBE uses [SSA](https://en.wikipedia.org/wiki/Static_single-assignment_form) representation, which means (to the best of my knowledge) that each variable is
assigned only once. QBE, however, is not strict about SSA form and is able to fixup
programs that are not in SSA form. This is what we do with %dptr (the data pointer)
but for intermediate values we use step variable to define variables of the form
`.1, .2, ...`.

We write all these instructions in the main function:
```zig
fn setup(e: *Emitter) !void {
    try e.addInstructionFmt("data $tape = {{ z {} }}\n", .{e.tape_size});
    try e.addInstructionCopy("export function w $main() {");
    try e.addInstructionCopy("@start");
    try e.addInstructionCopy("    %dptr =l add 0, 0");
}
```
We also define a global array of specified tape size and initialize the value with zero.
## Pipelining the Enemy
QBE, given a file written in its IL, outputs an assembly. We need to assemble
and link that assembly file to produce an executable. I used `zig cc` to do that.
So our compiler pipeline is this:

Parse the input file into our representation.
```zig
var reprs = try Repr.parse(gpa, opts.source);
```

Generate QBE's IL from that representation and write that to a temporary file.
```zig
    // Stage 2: Generate SSA
    var ssa = try Emitter.emit(gpa, reprs, opts.num_cell);
    for (ssa.items) |ins| {
        ssa_wi.print("{s}\n", .{ins}) catch |err| {
            ...
        };
    }
```
Spawn a `qbe` command and pass the intermediate file with QBE IL to it.
```zig
    const qbe_result = std.process.run(gpa, io, .{
        .argv = &.{ "qbe", "-o", qbe_filename, ssa_filename },
    }) catch |err| {
        ...
    };

```
Spawn a `zig cc` command and pass the assembly produced by `qbe` to it. 
```zig
    // Stage 4: Hand off QBE output to `cc`
    const cc_result = std.process.run(gpa, io, .{
        .argv = &.{ "zig", "cc", qbe_filename, "-o", opts.out },
    }) catch |err| {
        ...
    };
}
```

## More
I also wrote an interpreter that works on the representation produced by the
parser and runs the code similar to a tree walk interpreter. Using that interpreter,
I provide a simple repl. Also there are few command line options that can use used
to either run the compiler, interpreter or repl and few options to configure them.

The usage message should make it more clear.

```bash
info:  Usage: qbf [command] [options]

 Commands:
   compile           Create an executable from brainfuck source file.
   run               Run a brainfuck file directly using the interpreter.
   repl              Run a read-eval-print loop using the interpreter.
   help              Print this help message.

 General Options:
   --num_cell <n>    Number of cells to use. Default is 30000.

 Compile Options:
   --out <file>      Put the output in file <file>.
   --artifact        Do not delete the intermediate artifact produced during the
                     pipeline.
   --stage <opt>     What stage of compilation to stop at? (Default: exe)
     opt:
       - ssa         Output the ssa output produced by the emitter.
       - asm         Output the assembly generated by QBE.
       - exe         Output the executable produced by `zig cc`.
```

And that is all.
