import React, { Component } from 'react';
import './UserInfo.scss';

function renderTableRow(head, data, link) {
  return (
    <tr>
      <th>{head}</th>
      <td>
        <a href={link}>{data}</a>
      </td>
    </tr>
  );
}

class UserInfo extends Component {
  renderTable() {
    const { email, phone, website, company } = this.props.info;
    return (
      <table>
        {[
          renderTableRow('Email', email, `mailto:${  email}`),
          renderTableRow('Phone', phone, `tel:${  phone}`),
          renderTableRow('Website', website, `http://${  website}`),
          renderTableRow('Company', company.name),
        ]}
      </table>
    );
  }

  render() {
    const { name } = this.props.info;
    return (
      <aside className="UserInfo">
        <h1>{name}</h1>
        <h2>Contact Me @</h2>
        {this.renderTable()}
      </aside>
    );
  }
}

export default UserInfo;
