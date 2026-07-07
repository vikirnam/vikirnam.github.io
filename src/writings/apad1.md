---
title: "A Problem A Day: Day 1"
date: 2026-07-07
shouldFeature: true
excerpt: "A Problem A Day is back and this time it is more exciting that ever. All the problems are hard problems. All the solutions are in Rust exclusively. All the writings are raw and unedited. We begin our journey with sorting and priority queues."
draft: true 
tags: ["rust", "dsa", "sorting", "priority-queue"]
---

## The Problem
The problem today is a LeetCode problem titled [Meeting Rooms III](https://leetcode.com/problems/meeting-rooms-iii/description/). You are give two inputs:

- An integer `n` that specifies the number of rooms available
- A 2D array `meetings` where each element is an array `[start, end]` that represent the
meeting's start and end time.

Every meeting is unique with respect to their start time.

As you have probably guessed, meetings needs room to be held and there are certain rules when it
comes to assigning rooms for meeting.

- Each meeting will be held in a free room with the lowest room number.
- If no rooms are available, the meeting will be delayed until one becomes available. The delayed meeting will have the same duration of the original meeting.
- When a room becomes available, it will be give to the meeting with the earliest original start time.

We are expected to return the room number where most meetings took place. In case of multiple rooms, we should return the lowest.


Before going into the solution, let's see what the function signature LeetCode provided for the
solution.
```rust
impl Solution {
    fn most_booked(n: i32, meetings: Vec<Vec<i32>>) -> i32 {
    }
}
```

## Brute Force
The first thing that came to my mind was obviously sorting. If there are rooms available, the
meeting with earlier start time can start right away. If not, when one becomes available, it will
be given to the meeting with the earliest start time. So, it does make sense to sort the meetings
based on their start time.

But then what? Well, this is the brute force. We can just loop over every room from `0` to `n-1`
and see if it is available. If one is, we are guaranteed that it is the lowest room number. If no
rooms are available, we can delay the meeting until one is. For that we need to keep track of the
earliest end time of the meetings that currently occupy the rooms.

When we do get a room, we need to increment the count associated with that room. When there are
no meetings left, we choose the room number with the highest count and return it.

```rust
#[derive(Clone, Copy, Default)]
struct RoomInfo {
    count: usize,
    last_end_time: Option<usize>,
}

fn most_booked(n: i32, mut meetings: Vec<Vec<i32>>) -> i32 {
    meetings.sort_by(|m1, m2| m1[0].cmp(&m2[0]));
    let mut rooms = vec![RoomInfo::default(); n as usize];
    let mut current_time: usize = 0;
    for (m_idx, meeting) in meetings.iter().enumerate() {
        current_time = std::cmp::max(meeting[0] as usize, current_time);
        let mut min_end_time = usize::MAX;
        'outer: loop {
            for (i, room) in rooms.iter_mut().enumerate() {
                let room_end_time = current_time
                                    - meeting[0] as usize
                                    + meeting[1] as usize;
                if room.last_end_time.is_none()
                || room.last_end_time.unwrap() <= current_time {
                    room.count += 1;
                    room.last_end_time = Some(room_end_time);
                    break 'outer;
                } else {
                    min_end_time = std::cmp::min(
                        min_end_time,
                        room.last_end_time.unwrap()
                    );
                }
            }
            current_time = min_end_time;
        }
    }     
    let mut max = 0;
    let mut max_idx = 0;
    for (i, room) in rooms.iter().enumerate() {
        if room.count > max {
            max = room.count;
            max_idx = i;
        }
    }
    max_idx as i32
}
```

There are probably a lot of unnecessary things in this code but this is the brute force approach.
It's about getting the answer right. Optimizing it with more efficient data structures and better
algorithms, keeping code simple and minimum comes next.

Having said that, our implementation shouldn't be that far off from an optimal one. At least for
this particular problem with its constraints.

Sorting the meetings takes
