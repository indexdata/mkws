# Releasing a new version of MKWS

## Introduction

This document is intended for the MKWS developers, not for _users_ of MKWS. Anyone is welcome to read it, but it won't be much use to anyone outside of the core team.

The public MKWS website http://mkws.indexdata.com/ is hosted on summer, and served from the `tools/htdocs` area of a git checkout in `/home/indexdata/mkws`.


## Updating the public MKWS site

To update the site, ssh into summer, and in the MKWS directory do a `git pull` to obtain the most recent code and documentation, followed by a `make` to update the HTML, CSS, etc. that is compiled in `tools/htdocs`. This procedure constitutes a "soft release" in which new functionality is furnished but there is no increment in the version number.


## Making a formal release

### Check the code.

Run the test suite (`make check` at the top level).

Then run some manual tests to satisfy yourself that things are looking good:

* Open an MKWS-based site using your current code, e.g. http://x.cnib.indexdata.com/
* open the debug/error console in your browser (often Alt-Cmd-J, Shift-Cmd-J or Alt-Cmd-K)
* Check the language links ("de", "da", "en")
* Run a search with few, but not to few results, e.g.: `freebsd`
* Check "Targets" | "Records" links
* Check "Next" and "Prev" links
* Click on the first hit and display details
* Click on a URL to jump to the local catalog or full text
* Limit search to a "Source"
* Limit search to an "Author"
* Sort results by "Title" and "Newest"
* etc.
* Check not only that the site works as expected, but also that the messages appearing in the JavaScript console are appropriate.

### Make the release

First, update the change-log, [`NEWS.markdown`](../src/NEWS.markdown), ensuring that it contains bullet-points for each significant change since the last release. The change-log _should_ have been updated along the way, as fixes were made, but you will need to consult [the Jira project](https://jira.indexdata.com/projects/MKWS) to be confident that you have included everything.

Check once more that the test-suite passes.

Edit the version file, [`../src/VERSION`](../src/VERSION) to contain the version-number of the new release. In choosing the new version number, honour [semantic versioning](https://semver.org/): in short, if the new release includes any backwards-incompatible changes, increment the major version number and reset the minor and patch numbers to zero (e.g. 2.5.3 &rarr; 3.0.0); otherwise, increment the minor version number and reset the patch-level (e.g. 2.5.3 &rarr; 2.6.0). For a truly trivial change, just increment the patch-level (e.g. 2.5.3 &rarr; 2.5.4).

Run `make release` and check that the results make sense.

Once you're happy with this, you can set it in stone:

* Commit your changes, push them to origin.
* Tag your commit with a tag consisting of the letter `f` followed by the new version number, e.g. `v2.6.0`, and push the tag.
* Login to summer, go to `/home/indexdata/mkws/src`.
* Update the repository: `git pull`.
* Make the new release publicly visible: `make`.

That's it.

