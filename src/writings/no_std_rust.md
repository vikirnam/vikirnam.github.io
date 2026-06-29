---
title: "All About no_std Rust"
date: 2026-06-28
shouldFeature: true
excerpt: "The rust standard library provide various important functionalities. The no_std attribute is a way to opt out of all these functionalities. In this blog, I explain why we would want to do that and more importantly how."
draft: true
tags: ["rust", "osdev"]
---

## Standard Library and Operating System
Rust defines its standard library as

> The Rust Standard Library is the foundation of portable Rust software, a set of
> minimal and battle-tested shared abstractions for the broader Rust ecosystem. It
> offers core types, like `Vec<T>` and `Option<T>`, library-defined operations on
> language primitives, standard macros, I/O and multithreading, among many other
> things.

This is true for most implementations of other programming languages as well. The
standard library of each languages and their implementation are a collection of code
providing functionalities like
- Implementation of common data structures and algorithms
- Interaction with external system
- Interaction with the operating system

Beside these, standard library of some languages provide extra functionalities for
other common operations like
- Parsing JSON, XML and other common data formats
- Building a web server

The important ones for today are interaction with operating system and interaction with external system (which is generally done through OS as well).

Operating systems have many important responsibilities one of which is providing
client programs with various services that are very difficult or impossible for
client programs to implement themselves. Some of these services include interacting
with hardware, running new programs, communicating with other programs among other things. The os provides these services through system calls. The most common way
OSes implement syscalls is through a software interrupts. The client programs can
invoke that system call using special instruction.

For example, on x86_64 system, `SYSCALL` is used to invoke a syscall.[^1] This instruction has no operands and the required arguments, along with the syscall number (which identifies which syscall to invoke)
is moved to appropriate registers before issuing the `SYSCALL` instruction.

The standard libraries provide nice abstractions over these system calls making it
easier to interface with the OS.

Here are few of the modules Rust's std exposes:
- `std::alloc`: Memory Allocation API
- `std::fs`: Filesystem manipulation operations
- `std::net`: Networking primitives for TCP/UDP communication
- `std::sync`: Useful synchronization primitives

and many, many more.

## What and Why?
So, what exactly is no_std?
It's an attribute that tells rust to not link against the standard library.
![Barry Series: What gif](../images/barry_what.gif)

You might be wondering why would we not want to link against the standard library
and miss out on all these awesome features.

I said before that the standard library provided a nice abstraction on top of the features the operating system provides. Looking at it another way,
the abstractions the standard library provides depends on operating system to function. Not just the abstractions, but collections like `Vec` uses
allocator provided by the operating system.

So, when we write code that can't utilize operating system functionalities because either there is no operating system support or the support from operating
system is not what we want, then we can't link with standard library. This is the case when we are writing our own operating system or hypervisor or when we
are writing code that directly run on hardware like embedded systems.

Let's do it. Let's write a program that uses the `no_std` attribute and see what we can come up with.

## How?
We are going to see what it takes to write a rust program without using a standard library. We do need to decide what our program will be. We don't want anything fancy
so lets just go for a simple "Hello, World" program.

First of all, let's create a binary using cargo

```bash
cargo new hello_no_std
```

Let's also run it with `cargo run` to make sure everything is as expected.


cargo run printed hello world. it works

add no_std attribute

we get three error when we try to compile again

```bash
error: cannot find macro `println` in this scope
 --> src/main.rs:4:5
  |
4 |     println!("Hello, world!");
  |     ^^^^^^^

error: `#[panic_handler]` function required, but not found

error: unwinding panics are not supported without std
  |
  = help: using nightly cargo, use -Zbuild-std with panic="abort" to avoid unwinding
  = note: since the core library is usually precompiled with panic="unwind", rebuilding your crate with panic="abort" may not be enough to fix the problem
```

remove the print line and lets try a program that does nothing

still the last two errors

```bash
error: `#[panic_handler]` function required, but not found

error: unwinding panics are not supported without std
...
```

what is panic_handler? or better yet, what is panic?

https://doc.rust-lang.org/reference/panic.html#panic

> The panic_handler attribute can be applied to a function to define the behavior of panics.

hmm

lets do it then

```bash
error[E0308]: `#[panic_handler]` function has wrong type
 --> src/main.rs:8:1
  |
8 | fn handle_panic() {}
  | ^^^^^^^^^^^^^^^^^ incorrect number of function parameters
  |
  = note: expected signature `for<'a, 'b> fn(&'a PanicInfo<'b>) -> !`
             found signature `fn() -> ()`
```

something like that was in the reference too i think

> The panic_handler attribute can only be applied to a function with signature `fn(&PanicInfo) -> !`.

PanicInfo?
https://doc.rust-lang.org/core/panic/struct.PanicInfo.html

more on reference
> The panic strategy can be chosen in rustc with the -C panic CLI flag.

```toml
[profile.dev]
panic="abort"

[profile.release]
panic="abort"
```

new error. lets goo

```bash
error: using `fn main` requires the standard library
  |
  = help: use `#![no_main]` to bypass the Rust generated entrypoint and declare a platform specific entrypoint yourself, usually with `#[no_mangle]`
```

do what the compiler says

```bash
error: linking with `cc` failed: exit status: 1

= note: rust-lld: error: undefined symbol: main
          >>> referenced by /nix/store/8kvxvr3pmsypxiypq4g8zy13glnfr7nx-glibc-2.42-67/lib/Scrt1.o:(_start)

          rust-lld: error: undefined symbol: __libc_start_main
          >>> referenced by /nix/store/8kvxvr3pmsypxiypq4g8zy13glnfr7nx-glibc-2.42-67/lib/Scrt1.o:(_start)
          collect2: error: ld returned 1 exit status
```

cargo book

> On Unix-like targets that use cc as the linker driver, use -Clink-arg=-Wl,$ARG to pass an argument to the actual linker.

https://doc.rust-lang.org/rustc/codegen-options/index.html#link-arg

more on linker script
https://home.cs.colorado.edu/~main/cs1300/doc/gnu/ld_3.html
```toml
[build]
rustflags = ["-C", "link-args=-Wl,-T,custom.ld"]
```


## The no_std ecosystem

## References
- [OSDev Wiki: System Calls](https://wiki.osdev.org/System_Calls)


[^1]: https://www.felixcloutier.com/x86/syscall 
