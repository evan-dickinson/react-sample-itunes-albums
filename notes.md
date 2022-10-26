Evan's implementation notes
===========================
To run the app, do `npm run start`.

My extra feature is sort. I implemented sort by popularity and price. The pattern can
be extended to sort by other attributes.

Many of the tests are pseudocode. That's because the testing framework I'm most
familiar with, enzyme, is not compatible with the latest version of React. And I
didn't learn that until I'd already started the project. So I went with pseudocode,
because the concepts are transferrable and the main difference is in the API details.

I wasn't able to find any kind of schema for the iTunes API endpoint, so the code that
parses the response is fragile. It assumes that all fields will always be present.
If I'd had documentation (or sourcde code) that described the API's guarantees,
I'd have been defensive about optional fields. But I didn't worry too much about missing
or malformed values in this demo app -- in my experience, it's very unusual to write
production code against an undocumented API.

There are a few things that I didn't do, because I timeboxed my work:
- When dealing with album art, there is a magic number of 170px. That should be 
  extracted into a constant.
- Long album titles can cause the card height to get too large. To address this,
  I'd clip the title and/or re-design to accommodate longer titles.
- The "loading" and "error" states are super basic, and should be designed better.
- If `buildStoreItemData()` throws, the exception isn't handled. Instead, it should
  lead to an error screen.
- Visual fit & finish. For example, if an album title wraps onto multiple lines, it
  causes the card to be taller than the other cards in the row.  

And some important topics seemed outside the scope of this demo app:
- State management (e.g., Redux). For this simple project, using hooks and props for
  state is just fine. There wasn't enough complexity to inform a decision about which
  state management solution to use.
- Screenshot testing
- Unicode and handling non-English text
- Customizing the ESLint configuration
- Formatting code with Prettier
