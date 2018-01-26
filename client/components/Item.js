import React from 'react'
import {Link} from 'react-router-dom'
import Store from '../Store'
import QuantityTweaker from './QuantityTweaker'

class Item extends React.Component {
  render() {
    const {id, name, description, price, media, quantity, withLink} = this.props
    return (
      <div>
        {name
          ? [
              <strong key="0">
                {withLink ? <Link to={`/item/${id}`}>{name}</Link> : name}
              </strong>,
              <br key="1" />
            ]
          : null}
        {price ? <strong>£{price} - </strong> : null}
        {description}
        {quantity != null ? (
          <QuantityTweaker
            value={quantity}
            onChange={value =>
              Store.dispatch({type: 'UPDATE_QUANTITY', payload: {id, value}})
            }
          />
        ) : null}
        {/* alt="" stops screen-readers reading the URL or title/description a
            second time */}
        {media ? <img src={media} alt="" /> : null}
      </div>
    )
  }
}

export default Item
