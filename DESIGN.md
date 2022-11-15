# Design

After inspecting the one api, I started planning a simple interface for clients to interact with.
```
new Client().getBooks()
new Client().getBook()
new Client().getMovies()
...
```

**In most situations, I would value documentation more. Given the simplicity of the API and the data objects in play, I chose to skip documentation generation. I later regretted this decision as I started to construct the various filters, pagination, and sort options.**

## Design Decisions
* `axios` was chosen as the underlying http library. Since some of the api does not require authentication, I wanted to leave the door open to using this in the browser with the same code. `node-fetch` is another option, but serious vetting wasn't done for this exercise. I made a private method `makeRequest<T>` that does most of the heavy lifting, swapping out axios would not be a heavy lift. Even providing different implementations based on environment (node vs. browser) wouldn't be too difficult.
* Type all of the things. One big reason to use Typescript is for build time checks.  I tried to avoid `any` and using overly generic types to represent the apis. The types for filter, sort, and pagination prevented multiple erros while I was creating the samples.
    * Simply allowing a string like `?limit=10` to be passed into the functions would have saved a fair amount of time. The filter options was not trivial to add types to. Working on limited time, this may have not been the best portion to spend time on.
* **Unimplemented** Provide an API wrapper with a `getData` (or similar) method to retrieve the expected fields.  Passing through the body of the response makes the single object responses slightly awkward.  For example, `resp.docs` for the `getBook` method actually contains a list with a single element.


