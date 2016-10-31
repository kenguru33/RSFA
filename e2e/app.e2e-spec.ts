import { RSFAPage } from './app.po';

describe('rsfa App', function() {
  let page: RSFAPage;

  beforeEach(() => {
    page = new RSFAPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
