import React from 'react'
import style from './Paginator.module.scss'


/*for span will be active Classes. It will : className= { this.props.currentPage === p && style.selectedPage}*/

interface Props {
    onPageChangeHandler: (pageNumber: number) => void,
    pageSize: number,
    totalFriendCount: number,
    currentPage: number
}

const PaginatorComponent: React.FC <Props> = ({  totalFriendCount,
                                         onPageChangeHandler,
                                         pageSize, currentPage,

                                     }) => {


    const pageCount = Math.ceil(totalFriendCount / pageSize)
    const pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i)
    }

    return (<div>
        {
            pages.map(p => {
                return (
                    <span
                        onClick={() => onPageChangeHandler(p)}>{p}</span>
                )
            })
        }
    </div>)
}

export default PaginatorComponent;