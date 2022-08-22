Evan's implementation notes
===========================

My extra feature is sort. I implemented sort by popularity and price. The pattern can
be extended to sort by other attributes.

Many of the tests are pseudocode. That's because the testing framework I'm most
familiar with, enzyme, is not compatible with the latest version of React. And I
didn't learn that until I'd already started the project. So I went with pseudocode,
because the concepts are transferrable and the main difference is in the API details.

I wasn't able to find any kind of schema for the iTunes API endpoint, so the code that
parses the response is fragile. I didn't know where to add robustness, because I didn't
know what the API guarantees will be present in its responses. I didn't worry too
much about errors here, because in my experience it's very unusual to code against an
API with no documentation and/or source code. If I actually had to write production 
code against a mystery API, I'd be much more defensive than I was here.

There are a few things that I didn't do, because I timeboxed my work:
- When dealing with album art, there is a magic number of 170px. That should be 
  extracted into a constant.
- The "loading" and "error" states are super basic, and should be designed better.
- If `buildStoreItemData()` throws, the exception isn't handled. Instead, it should
  lead to an error screen.
- Visual fit & finish. For example, if an album title wraps onto multiple lines, it
  causes the card to be taller than the other cards in the row.  

And some important topics seemed outside the scope of this demo app:
- Unicode and handling non-English text
- State management (e.g., Redux)
- Customizing the ESLint configuration
- Formatting code with Prettier
