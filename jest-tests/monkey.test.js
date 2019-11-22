describe('monkey-tests', () => {
  it("has a basic snapshot test", () => {
    expect('monkey 23').toMatchSnapshot();
    expect('monkey 2342').toMatchSnapshot();
  });
});
