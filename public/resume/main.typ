#import "@preview/acadennial-cv:0.1.0": *
#import "@preview/scienceicons:0.1.0": *

// ============================================
// Default function configurations
// ============================================

#let col-cfg = (
  c1-len: 15%,
  c2-len: 1fr,
  c3-len: auto,
  col-gutter: 1em,
)

#let employment-head = employment-head.with(..col-cfg)
#let employment-head-item = employment-head-item.with(..col-cfg)
#let employment-head-item-list = employment-head-item-list.with(..col-cfg)
#let meta-entry = meta-entry.with(..col-cfg)
#let meta-entry-item = meta-entry-item.with(..col-cfg)
#let meta-entry-item-list = meta-entry-item-list.with(..col-cfg)
#let pub-item = pub-item.with(..col-cfg)
#let pub-item-list = pub-item-list.with(..col-cfg)

// ============================================
// Initialize resume settings
// ============================================
#show: resume.with(
  col-args: (
    c1-len: col-cfg.c1-len,
    c2-len: col-cfg.c2-len,
    col-gutter: col-cfg.col-gutter,
  ),
  author-info: (
    name: "Sudesh Subedi",
    primary-info: [
      Computer Engineer,\
      Kathmandu, Nepal
    ],
    secondary-info: [
      #link("https://www.sudeshsubedi.com.np")[#website-icon() www.sudeshsubedi.com.np] \
      #link("mailto:sudeshsubedi123@gmail.com")[sudeshsubedi123\@gmail.com] \
      +977 9840114485 \
      #link("https://github.com/faultypointer")[#github-icon()]
      #link("https://linkedin.com/in/sudesh-subedi")[#linkedin-icon()]
    ],
  ),
)

== Education
#employment-head-item-list(
  (
    c2: "Tribhuvan University",
    c3: "IOE, Purwanchal Campus, Dharan, Nepal",
    body: [
      *Bachelor in Computer Engineering*, _2022-2026_\
      \
      *Relevant Courses*:\
      Data Structures and Algorithms, Operating Systems, Database Management System, Computer Organization and Architecture, Computer Networks, Software Engineering, Project Management\
      \
      _Major Project_: Implementing Read/Write Overlay Filesystem Support in a Microkernel
      Based Operating System \
      _Supervisor_: Er. Manoj Kumar Guragai \
      \
      _Minor Project_: A Decentralized and Federated Social Media for Scientific Communications.
      _Supervisor_: Er. Pukar Karki\
    ],
  ),

  (
    c2: "Capital College and Research Center",
    c3: "Koteshwore, Kathmandu",
    body: [
      National Examination Board +2, Science, 2019-2021
    ],
  ),
)


== Projects

#meta-entry-item-list(
  (
    c1: "2025-2026",
    c2: text(
      tracking: -0.1pt,
    )[A Read/Write Overlay Filesystem Support in a Microkernel Based Operating System (Ongoing)],
    c3: "Purwanchal Campus, Dharan, Nepal",
    body: [Currently working on developing Overlay(Union) File System for Redox OS. It combines multiple different mount points of an existing filesystem into one, resulting in a single directory structure that contains underlying files and sub-directories from all sources.],
  ),
  (
    c1: "2024-2025",
    c2: text(
      tracking: -0.1pt,
    )[A Federated Social Media for Scientific Communicators #link("https://scientiac.space/blog/3o14-social/")[#website-icon()]],
    c3: "Purwanchal Campus, Dharan, Nepal",
    body: [Developed 3o14 (pi), a single user ActivityPub based fediverse client and server that supports rendering mathematical typesetting as a way to scientifically communicate between users, facilating to write posts and replies using Markdown and LaTeX with a complete microblogging experience.],
  ),
  (
    c1: "2024",
    c2: "A UCI Compatible Chess Engine",
    c3: "Zig",
    body: [
      Developed a UCI-compatible chess engine in Zig with support for core UCI commands, move
      generation, board evaluation, and game state management. Focused on low-level systems
      programming, engine architecture, and search logic while exploring performance-oriented
      design in Zig.
    ],
  ),
)

== Mini Projects

#meta-entry-item-list(
  c2-text-args: (weight: "regular"),
  item-spacing: 0.8em,
  (
    c1: [RustyJP #link("https://github.com/faultypointer/RustyJP")[#github-icon()]],
    c2: "A CLI tool for learning Japanese alphabets (Hiragana and Katakana) as well as Kanji using
spaced repetition method and custom kanji addition.",
  ),
  (
    c1: [Zhip-8 #link("https://github.com/faultypointer/Zhip-8")[#github-icon()]],
    c2: "CHIP-8 emulator written in zig featuring opcode decoding, memory management, display
rendering, timers, and input handling.",
  ),
  (
    c1: [PngMe #link("https://github.com/faultypointer/PngMe")[#github-icon()]],
    c2: "Rust-based CLI application for PNG steganography, supporting message encoding/decoding,
chunk listing, and safe removal of embedded data within PNG file structure.",
  ),
)

== Research Interests
Operating Systems, Distributed Systems, Advance Algorithms and Data Structures,
Compiler Development

== Extras

#meta-entry-item-list(
  c2-text-args: (weight: "regular"),
  item-spacing: 0.8em,
  (c2: [*Spoken Languages*], body: [English (_Academic_), Nepali (_Native_), Hindi(_Conversational_)]),
  // (c2: [*Hobbies*], body: "Blogging, Technical Writing"),
)
