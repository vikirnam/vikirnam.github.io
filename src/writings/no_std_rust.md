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



## References
- [OSDev Wiki: System Calls](https://wiki.osdev.org/System_Calls)


[^1]: https://www.felixcloutier.com/x86/syscall 
