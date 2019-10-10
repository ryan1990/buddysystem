// have username/userId be case-insensitive so user and AWS doesn't have to worry about case

// we should have a stub that we can point the real app to for testing
// we should have TDD style tests written expecting specific JSON response content when they call the real API
// when these pass, we know we're done. they should also pass for the stubs.

// GET
// https://DomainAndPath/usernameExists
// response JSON:
// { "userExists": "true" }

// GET
// https://DomainAndPath/usernameDoesntExist
// response JSON:
// { "userExists": "false" }