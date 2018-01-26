import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import Store from '../Store'
import QuantityTweaker from './QuantityTweaker'

const ImgWrapper = styled.div`
  text-align: center;
  margin: 10px 0;
`

class Item extends React.Component {
  render() {
    const {id, name, description, price, media, quantity, withLink} = this.props
    return (
      <div>
        {name ? (
          <h2 key="0">
            {withLink ? <Link to={`/item/${id}`}>{name}</Link> : name}
          </h2>
        ) : null}
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
        {media ? (
          <ImgWrapper>
            <img src={media} alt="" />
          </ImgWrapper>
        ) : null}
      </div>
    )
  }
}

export default Item
