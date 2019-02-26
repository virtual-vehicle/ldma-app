import { API } from 'ldmaapp/src/constants/api';

describe('test staging constants', () => {
  it('check if the backend url is correct', () => {
    const expectedBackendUrl = 'http://ldma.us-east-2.elasticbeanstalk.com/api/v1';
    expect(API.BACKEND_URL).toEqual(expectedBackendUrl);
  });
});

