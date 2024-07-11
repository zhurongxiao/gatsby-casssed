// 导入 React 库
import React from 'react';
// 从 reactstrap 库导入分页组件
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

// 创建一个名为 PaginationLinks 的函数组件，接收 currentPage 和 numberOfPages 作为 props
const PaginationLinks = ({ currentPage, numberOfPages }) => {
    // 判断当前页是否为第一页
    const isFirst = currentPage === 1;
    // 判断当前页是否为最后一页
    const isLast = currentPage === numberOfPages;
    // 构造前一页的 URL，如果是第一页则返回根路径
    const previousPage = currentPage - 1 === 1 ? '/' : `/page/${currentPage - 1}`;
    // 构造下一页的 URL
    const nextPage = `/page/${currentPage + 1}`;

    // 返回分页组件
    return (
        // 分页组件，设置 ARIA 标签用于辅助设备
        <Pagination aria-label="Page navigation example">
            {/* 如果是第一页，则禁用上一页链接 */}
            {isFirst ? (
                <PaginationItem disabled>
                    <PaginationLink previous href="/" />
                </PaginationItem>
            ) : (
                // 否则，创建上一页链接
                <PaginationItem>
                    <PaginationLink previous href={previousPage} />
                </PaginationItem>
            )}
            {/* 遍历所有页码，生成页码链接 */}
            {Array.from({ length: numberOfPages }, (_, i) =>
                // 如果当前页与遍历到的页码相同，则标记为激活状态
                currentPage === i + 1 ? (
                    <PaginationItem active key={`page-number${i + 1}`}>
                        <PaginationLink href={`/${i === 0 ? '' : 'page/' + (i + 1)}`}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                ) : (
                    // 否则，创建普通页码链接
                    <PaginationItem key={`page-number${i + 1}`}>
                        <PaginationLink href={`/${i === 0 ? '' : 'page/' + (i + 1)}`}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )
            )}
            {/* 如果是最后一页，则禁用下一页链接 */}
            {isLast ? (
                <PaginationItem disabled>
                    <PaginationLink next href={nextPage} />
                </PaginationItem>
            ) : (
                // 否则，创建下一页链接
                <PaginationItem>
                    <PaginationLink next href={nextPage} />
                </PaginationItem>
            )}
        </Pagination>
    );
};

// 导出 PaginationLinks 组件
export default PaginationLinks;