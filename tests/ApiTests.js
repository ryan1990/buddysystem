// have username/userId be case-insensitive so user and AWS doesn't have to worry about case

// have api calls all be made from same file

// we should have a stub that we can point the real app to for testing certain calls
// we should have TDD style tests written expecting specific JSON response content when they call the real API?
    // we could test for the format of JSON responses, but it doesn't make sense to check for exact content.
    // when these pass, we know we're done. they should also pass for the stubs.

// Check if the entered email address exists in AWS:

    // GET
    // https://DomainAndPath/{usernameThatExists}
    // response HTTP Code: 200
    // response JSON:
    // { "userExists": "true" }

    // GET
    // https://DomainAndPath/{usernameThatDoesntExist}
    // response HTTP Code: 200
    // expected response JSON:
    // { "userExists": "false" }



// Create new user account

    