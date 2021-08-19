import TableComponent from "../../shared/base/tableComponent.mjs";

export default class TableBrowserComponent extends TableComponent {
  render(data) {
    const template = this.prepareData(data);
    console.log(template);
    document.body.insertAdjacentHTML("afterBegin", template);
  }

  prepareData(data) {
    const [firstItem] = data;
    const theaders = Object.keys(firstItem).map(
      (text) => `<th scope="col">${text}</th>`
    );

    const joinLists = (lists) => lists.join("");

    const tbody = data
      .map((item) => Object.values(item))
      .map((item) => item.map((value) => `<td>${value}</td>`))
      .map((tds) => `<tr>${joinLists(tds)}</tr>`);

      const tBodyValues = data
                    .map(item => Object.values(item))
                    .map(item => item.map(value => `<td>${value}</td>`))
                    .map(tds => `<tr>${joinLists(tds)}</tr>`)

    const tableTemplate = `
      <table class="table">
        <thead>
          <tr>${joinLists(theaders)}</tr>
        </thead>
        <tbody>
         ${joinLists(tbody)}
        </tbody>
      </table>
      `;

    return tableTemplate;
  }
}
