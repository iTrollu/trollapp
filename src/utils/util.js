export function getData() {
  return new Promise((resolve, reject) => {
    const sm = 100,
          md = 200,
          fbName = 'name',
          fbLink = 'link',
          fbSmPicture = `picture.width(${sm}).height(${sm})`,
          fbMdPicture = `picture.width(${md}).height(${md})`,
          fbFromUser = `from{${fbName},${fbLink},${fbSmPicture}}`;

    FB.api(`/me?fields=${fbName},cover,${fbLink},${fbMdPicture},
            feed{likes{${fbName},${fbLink},${fbSmPicture}},
            comments{${fbFromUser}},
            ${fbFromUser}}`, (response) => {
      if (!response || response.error) {
        reject(response.error);
      } else {
        const {
          name,
          picture: {
            data: {
              url
            }
          }
        } = response;

        (async () => {
          try {
            resolve({
              profile: {
                name,
                url
              }
            });
          } catch (e) {
            reject(e);
          }
        })();
      }
    });
  });
}
