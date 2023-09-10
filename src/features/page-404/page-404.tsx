import React, { FC } from 'react'
import s from './page-404.module.css'

export const Page404: FC = () => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>404: PAGE NOT FOUND</h1>
      <img className={s.image} src="https://images.all-free-download.com/images/graphiclarge/error_404_page_not_found_6845510.jpg" />
    </div>
  )
}
