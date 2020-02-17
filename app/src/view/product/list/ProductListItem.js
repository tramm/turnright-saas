import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MaterialLink from '@material-ui/core/Link';

import { connect } from 'react-redux';
import selectors from 'modules/product/productSelectors';

class ProductListItem extends Component {
  valueAsArray = () => {
    const { value } = this.props;

    if (!value) {
      return [];
    }

    if (Array.isArray(value)) {
      return value;
    }

    return [value];
  };

  displayableRecord = (record) => {
    if (this.props.hasPermissionToRead) {
      return (
        <div key={record.id}>
          <MaterialLink
            component={Link}
            to={`/product/${record.id}`}
          >
            {record['name']}
          </MaterialLink>
        </div>
      );
    }

    return <div key={record.id}>{record['name']}</div>;
  };

  render() {
    if (!this.valueAsArray().length) {
      return null;
    }

    return this.valueAsArray().map((value) =>
      this.displayableRecord(value),
    );
  }
}

ProductListItem.propTypes = {
  value: PropTypes.any,
};

const select = (state) => ({
  hasPermissionToRead: selectors.selectPermissionToRead(
    state,
  ),
});

export default connect(select)(ProductListItem);
