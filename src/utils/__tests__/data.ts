import dataUtils from 'utils/data';

describe('utils data:', () => {
  it('getItemId', () => {
    jest.spyOn(dataUtils, 'getItemId');
    const mockedGetItemId = dataUtils.getItemId as jest.Mock;
    const mockItems = [
      {
        href: '/listen/wit-80-s/mockItemId',
      },
      {
        url: '/visit/lyon/mockItemId',
      },
      {
        page: {
          url: '/visit/lyon/mockItemId',
        },
      },
    ];
    
    mockItems.forEach(mockItem => mockedGetItemId(mockItem));
    
    expect(mockedGetItemId).toBeCalledTimes(mockItems.length);
    expect(mockedGetItemId.mock.results).toMatchSnapshot();
  });
});
