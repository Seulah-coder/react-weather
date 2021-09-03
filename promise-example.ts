//변경후

const fetchUser = async () : Promise<string> => {
    var url = 'https://jsonplaceholder.typicode.com/users/1'
    const response = await fetch(url);

    const json =  await response.json();
    return json;
  }
  export default fetchUser;

  //변경전

  function fetchUser() {
    var url = 'https://jsonplaceholder.typicode.com/users/1'
    return fetch(url).then(function(response) {
      return response.json();
    });
  }