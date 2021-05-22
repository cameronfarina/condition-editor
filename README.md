Please run `npm i` and `npm run dev` to build locally. To run the tests I've created, run `npm run test`.

---

### My Thoughts

---

First, I began with restructuring the data from the API to make it easier to work with
(see line 21 of index.jsx). Once the data looked the way I wanted, I created the table
utilizing simple mapping functions.

Once the table was complete, I began thinking about how to design the rest of the app.
To ensure a smooth UX, I built conditional dropdowns that would render upon the previous
dropdown being used.

Lastly, the meat of the challenge, the filtering functionality.

I opted to create separate filtering functions to handle the different operators.
While there are similarities throughout the functions, I felt it was not worth
sacrificing either readability or testability to create one large filtering function.

All tests can be found in the /utility directory.

---

### The App, UI and Assumptions

---

To begin, we select a property which then prompts the operator dropdown to appear
and lastly we see either a text box or a multi select option.

We store and pass the search criteria to the respective filter functionality and
return the results. Because we were able to assume no other operators would be used,
I created an 'options' variable and utilized this to determine which filter function
would be used.

My goal was to be as efficient as possible with my time throughout this challenge
while also producing clean, readable code.

Time taken broken down to the best of my ability:

- environment setup (5 minutes)
- restructuring data and creating of the table (25 minutes)
- building out filter functions with tests (1 hour)
- testing for edge cases (30 minutes)
- styling and cleanup (10 minutes)
- README (10 minutes)

All in all, this challenge took a bit over 2 hours.

I appreciate you giving me the opportunity to showcase my skills and hope to hear your
feedback soon!
