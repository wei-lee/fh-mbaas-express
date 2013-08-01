exports['globalSetUp'] = function(test, assert) {
  // Set up database schema here...
  // Push known data set to database here...
  test.finish();
}

exports['globalTearDown'] = function(test, assert) {
  // Drop database here...
  test.finish();
}
