async function fetchData() {
  try {
    const resp = await fetch("http://localhost:5300/api/product"); // fetch returns a Response
    const res = await resp.json(); // now parse JSON from response
    console.log(res);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}
 fetchData();