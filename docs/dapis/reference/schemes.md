---
title: Name and ID Schemes
folder: Reference
---

<TitleSpan>{{$frontmatter.folder}}</TitleSpan>

# {{$frontmatter.title}}

What is the difference between a dAPI name and a Beacon or Beacon set ID? dAPI
names are the principle means used to get API provider data held by Beacons. Any
one Beacon, identified by an ID, has a single value. A dAPI may in fact get
values from several Beacons and average the values, and/or apply other logic,
before returning a single value to the reader.

dAPIs can be fluid because they use a publicly known set of Beacons to source
values from. The list of Beacons could be altered for best-in-time results (e.g.
Beacon availability) without a reader needing to change the code of its smart
contract. Beacons could come and go but dAPIs are durable. Because of this
flexibility it is always best to use the dAPI name rather than Beacon IDs which
are fixed.

- dAPI name: A human readable name that represents a Beacon or Beacon set. The
  name is assigned when the dAPI is created and never changes.
- Beacon ID: The hash of a Beacon's parameters.
- Beacon set ID: The hash of the Beacon IDs in the Beacon set.

A dAPI's name is identical across all chains. When accessing a dAPI value with a
function such as
[readDataFeedWithName()](../developers/read-data-feed-with-dapi-name.md), only
the dAPI `name` is needed.

A Beacon's ID and its template are identical across chains. When accessing a
Beacon's value with a function such as
[readDataFeedWithId()](../developers/read-data-feed-with-id.md), the `beaconId`
is needed.
