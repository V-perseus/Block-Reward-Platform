import React, { useState } from 'react'
import { LayoutContainer, Modal } from '../../../shared'
import MdcCheckDecagram from '@meronex/icons/mdc/MdcCheckDecagram'
import BsCardImage from '@meronex/icons/bs/BsCardImage'
import AiOutlineStar from '@meronex/icons/ai/AiOutlineStar'
import BiShareAlt from '@meronex/icons/bi/BiShareAlt'
import { Button, Select } from '../../../../styles'
import BsCameraVideo from '@meronex/icons/bs/BsCameraVideo'
import { useLocation } from "react-router-dom";
import { useWindowSize } from '../../../../hooks/useWindowSize'
import { ShareItem } from '../ShareItem'
import {
  Container,
  ImgWrapper,
  InfoWrapper,
  Heading,
  HeadingTitleWrapper,
  ActionWrapper,
  ActionItem,
  Description,
  Editions,
  HasLoyalty,
  Option,
  Royalty,
  BlockChainBar,
  Table,
  THead,
  TBody,
  TableTitle,
  TableContent,
  TableItemInfo,
  ItemDetail
} from './styles'
import { AlgorandIcon } from '../../../shared/SvgIcons'

export const ItemHero = () => {
  const { width } = useWindowSize()
  const [currency, setCurrency] = useState('algo')
  const [isMore, setIsMore] = useState(true)
  const [openShare, setOpenShare] = useState(false)
  const data = useLocation(); 

  const creatorOptions = [
    { value: 'usd', content: <Option><span className='name'>USD</span></Option> },
    { value: 'usdc', content: <Option><span className='name'>USDC</span></Option> },
    { value: 'algo', content: <Option><span className='name'>ALGO</span></Option> },
    { value: 'btc', content: <Option><span className='name'>BTC</span></Option> },
    { value: 'eth', content: <Option><span className='name'>ETH</span></Option> },
    { value: 'eur', content: <Option><span className='name'>EUR</span></Option> },
    { value: 'gbp', content: <Option><span className='name'>GBP</span></Option> },
  ]

  return (
    <>
      <LayoutContainer>
        {width < 576 && (
          <ActionWrapper>
            <ActionItem>
              <AiOutlineStar />
              <span>0 stars</span>
            </ActionItem>
            <ActionItem onClick={() => setOpenShare(true)}>
              <BiShareAlt />
              <span>Share</span>
            </ActionItem>
          </ActionWrapper>
        )}
        <Container>
          <ImgWrapper>
            {/* <img src='https://d2tg7hjmtin7hh.cloudfront.net/thumbs/nft_item_cover/dd12/dd12b890-fcc2-4a94-b475-4cc09fccd79d_large.png' alt='' /> */}
            <video
              controlsList="nodownload"
              loop
              controls
              muted
              playsInline=""
              autoPlay
              src= {data.state}
              poster="https://api.limewire.com/catalog/cached/nft-items/77447f4a-fe9f-4472-89ac-250d4bcfea26/cover-image?size=medium"
            >
				  </video>
          </ImgWrapper>
          <InfoWrapper>
            {/* <Heading>
              <HeadingTitleWrapper>
                <div>
                  <span>BlockReward</span>
                  <MdcCheckDecagram />
                </div>
                <h2>The Palm</h2>
              </HeadingTitleWrapper>
              {width > 576 && (
                <ActionWrapper>
                  <ActionItem>
                    <AiOutlineStar />
                    <span>0 stars</span>
                  </ActionItem>
                  <ActionItem onClick={() => setOpenShare(true)}>
                    <BiShareAlt />
                    <span>Share</span>
                  </ActionItem>
                </ActionWrapper>
              )}
            </Heading>
            <Description>
              {isMore ? (
                <span>The collection consists of 16 different collectible digital trading cards & artworks representing the songs on Aitch's new album. For each purchase you will receive one of the 16 digital trading cards & art</span>
              ) : (
                <span>The collection consists of 16 different collectible digital trading cards & artworks representing the songs on Aitch's new album. For each purchase you will receive one of the 16 digital trading cards & art pieces. Each collectible comes with the chance to win one of 46 super rare real life perks. The winners will be revealed once the collection is sold out.</span>
              )}
              <button onClick={() => setIsMore(prev => !prev)}>{!isMore ? 'Read Less' : '... Read More'}</button>
            </Description>
            <Editions>
              <span className="limited_to">"Close To Home" Mystery Box</span>
              <span className="market">Owned by @n5r59plagp</span>
            </Editions>
            <HasLoyalty>
              <label>Sale Details</label>
              <div>
                <span>USDC $15.00</span>
                <Select
                  notReload
                  placeholder='Select creator'
                  options={creatorOptions}
                  defaultValue={currency}
                  onChange={val => setCurrency(val)}
                />
              </div>
            </HasLoyalty>
            <Royalty>Includes Creator Royalty of 5.00%</Royalty>
            <Button color='gray' naked disabled>Not listed for sale</Button> */}
          </InfoWrapper>
        </Container>
        {/* <BlockChainBar>
          <Table>
            <THead>
              <tr>
                {width > 576 && (
                  <th className='title'>
                    <TableTitle>Blockchain</TableTitle>
                  </th>
                )}
                <th>
                  <TableContent>
                    <div>
                      <TableItemInfo>
                        <AlgorandIcon />
                        <span>Algorand</span>
                      </TableItemInfo>
                    </div>
                    <div>
                      <TableItemInfo>
                        <span>Token ID: 836759854 (View on AlgoExplorer)</span>
                      </TableItemInfo>
                    </div>
                  </TableContent>
                </th>
              </tr>
            </THead>
            <TBody>
              <tr>
                {width > 576 && (
                  <td className='title'>
                    <TableTitle>Item Content</TableTitle>
                  </td>
                )}

                <td>
                  <TableContent>
                    <div>
                      <TableItemInfo>
                        <BsCardImage />
                        <span>The Palm</span>
                      </TableItemInfo>
                      <ItemDetail>JPEG Image (Size: 88 KB)</ItemDetail>
                    </div>
                    <div>
                      <TableItemInfo>
                        <BsCameraVideo />
                        <span>The Palm</span>
                      </TableItemInfo>
                      <ItemDetail>MP4 Video (Size: 4 MB)</ItemDetail>
                    </div>
                    <div>
                      <TableItemInfo>
                        <BsCardImage />
                        <span>The Palm</span>
                      </TableItemInfo>
                      <ItemDetail>PNG Image (Size: 7 MB)</ItemDetail>
                    </div>
                  </TableContent>
                </td>
              </tr>
            </TBody>
          </Table>
        </BlockChainBar> */}
      </LayoutContainer>
      <Modal
        width='420px'
        open={openShare}
        onClose={() => setOpenShare(false)}
      >
        <ShareItem onClose={() => setOpenShare(false)} />
      </Modal>
    </>
  )
}
