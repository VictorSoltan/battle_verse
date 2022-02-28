import React from 'react';

import IconSort from '../../assets/marketplace/icons/icon_sort.svg'
import IconGridType1 from '../../assets/marketplace/icons/icon_gridT1.svg'
import IconGridType2 from '../../assets/marketplace/icons/icon_gridT2.svg'

function SubHeader({ ammount }) {
  const selected = true;

  return (
    <div className='sub-header-mp'>
      <div className='sub-header-mp__ammount'>
        <span>{ ammount } CHARS</span>
      </div>
      <div className='sub-header-mp__actions'>
        <div className='sub-header-mp__price-sort'>
          <span>Low price</span>
          <img src={IconSort} alt="icon sort" />
        </div>
        <div className='sub-header-mp__grid'>
          <div className='sub-header-mp__grid-type'>
            <img src={IconGridType1} alt="icon grid type 1" />
          </div>
          <div className='sub-header-mp__grid-type selected' style={selected ? { background: '#13222A' } : ''}>
            <img src={IconGridType2} alt="icon grid type 2" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SubHeader