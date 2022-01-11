import React, { FC, useState, useEffect, useCallback, useMemo } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Spinner from 'react-bootstrap/Spinner';
import FormControl from 'react-bootstrap/FormControl';

import Layout from '../Layout';
import { getPhotos, searchPhotos, Photo as Photos } from '../../api';

import './style.css';

const Photo: FC = () => {
    const [images = [], setImages] = useState<Photos[]>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>();

    const [searchText, setSearchText] = useState<string>('');
    const [page, setPage] = useState(1);

    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        getRandomPhoto(page, searchText);
    }, [page, searchText]);

    const getRandomPhoto = useCallback(
        (page: number, searchText = '') => {
            setLoading(true);
            setTotalPages(0);
            if (searchText) {
                searchPhotos(page, searchText)
                    .then((res) => {
                        setImages(res.results);
                        setTotalPages(res.total_pages);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setError(error.toString());
                        setLoading(false);
                    });
            } else {
                getPhotos(page)
                    .then((res) => {
                        setImages(res);
                        setLoading(false);
                    })
                    .catch((error) => {
                        setError(error.toString());
                        setLoading(false);
                    });
            }
        },
        [setLoading, setImages, setError]
    );

    let minPage = useMemo(() => {
        if (totalPages === 0) {
            return Math.max(1, page - 2);
        }
        if (page + 2 > totalPages) {
            return Math.max(1, page - 4);
        } else {
            return Math.max(1, page - 2);
        }
    }, [page, totalPages]);

    let maxPage = useMemo(() => {
        if (totalPages === 0) {
            if (minPage === 1) {
                return minPage + 4;
            } else {
                return page + 2;
            }
        }
        if (minPage === 1) {
            return Math.min(totalPages, 5);
        } else {
            return Math.min(totalPages, page + 2);
        }
    }, [page, totalPages, minPage]);

    console.log('~~~~ minpage', minPage, maxPage);

    return (
        <Layout>
            <div className="wrapper">
                <div className="toolbar">
                    <input
                        className="form-control"
                        type="text"
                        placeholder="Search Photos"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                </div>
                <div className="gallery">
                    {error && <div className="error">{error}</div>}
                    {images.length > 0 && (
                        <div className="container">
                            <div className="row">
                                {images.map((item, index) => (
                                    <div className="col-md-4" key={index}>
                                        <div className="photo">
                                            <img src={item.urls.regular} alt="" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {loading && (
                        <div className="loader">
                            <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </Spinner>
                        </div>
                    )}
                </div>
                <Pagination>
                    <Pagination.First onClick={() => setPage(1)} />
                    <Pagination.Prev disabled={page <= 1} onClick={() => setPage((o) => o - 1)} />
                    {minPage > 1 && <Pagination.Ellipsis />}
                    {Array(maxPage - minPage + 1)
                        .fill(null)
                        .map((_value, index) => (
                            <Pagination.Item
                                key={index}
                                active={page === minPage + index}
                                onClick={() => setPage(minPage + index)}
                            >
                                {minPage + index}
                            </Pagination.Item>
                        ))}
                    {(maxPage < totalPages || totalPages === 0) && <Pagination.Ellipsis />}
                    <Pagination.Next disabled={page === totalPages} onClick={() => setPage((o) => o + 1)} />
                    {totalPages !== 0 && <Pagination.Last onClick={() => setPage(totalPages)} />}
                </Pagination>
            </div>
        </Layout>
    );
};

export default Photo;
