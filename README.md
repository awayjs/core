# AwayJS Core
[![Build Status](https://travis-ci.org/awayjs/core.svg?branch=dev)](https://travis-ci.org/awayjs/core)

The root dependency for all AwayJS modules: contains basic data structures, loading mechanisms, 
event objects and utility functions useful for all types of rich media interface and interaction.

## Internal Structure

* attributes<br>
Data structures for interleaved or isolated binary data streams.

* audio<br>
Data structures for audio (to be moved to its own audio module).

* errors<br>
Error types.

* events<br>
Event objects for core classes.

* geom<br>
Geometric data structures.

* image<br>
Deprecated.

* library<br>
Asset loading and management APIs.

* managers<br>
Managers for audio (to be moved to own audio module).

* net<br>
URL Request APIs.

* parsers<br>
Base classes for parsers API, possibly merge with library.

* projections<br>
Projection APIs for general 2D / 3D projection.

* ui<br>
Helper classes for interface interaction.

* utils<br>
Binary data wrappers, helper classes for RAF and timers, Color and debug utils.