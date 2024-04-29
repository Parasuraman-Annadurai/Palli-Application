import React from 'react'
import { Skeleton, Popover, Pagination, Tooltip,Tag } from 'antd'
import dayjs from "dayjs";
const ApplicationListView = (props) => {

    const truncateText = (text, maxLength) => {
        return text.length > maxLength
            ? text.substring(0, maxLength) + "..."
            : text;
    };
    const {
        limit,
        handleRemoveFilter,
        handleViewMore,
        setPage,
        setApplicationSearch,
        setPopoverVisible,
        applications, getPermission, isLoading, filterValues, user, applicationSearch, popoverVisible, content } = props
    return (
        <main className="application-full-container">
            <div className="application-main-container flex">
                <div className="header-name">
                    <h1>Applications list</h1>
                </div>
                <div className="application-actions flex">
                    <div className="import">
                        {/* {getPermission(
                user.permissions,
                "create_Excel_Import",
                "create_Excel_Import"
              ) && <button className="btn primary-medium">Import</button>} */}
                    </div>
                </div>
            </div>
            {getPermission(user.permissions, "Applicant", "read") && (
                <>
                    <div className="application-inner-container">
                        <div className="search-container">
                            <img src="/icons/searchIcon.svg" alt="" className="search-icon" />
                            <input
                                type="text"
                                value={applicationSearch}
                                placeholder="Search here"
                                onChange={(e) => setApplicationSearch(e.target.value)}
                            />

                            <Popover
                                placement="leftTop"
                                open={popoverVisible}
                                onOpenChange={(visible) => setPopoverVisible(visible)}
                                content={content}
                                trigger={["click"]}
                            >
                                <img
                                    src="/icons/filterIcon.svg"
                                    alt=""
                                    className="filter-icon"
                                />
                            </Popover>
                        </div>

                        <div className="filter-or-search-container">
                            {applicationSearch.length > 0 ? (
                                <>
                                    <Tag color="#49a843">Search : {applicationSearch} </Tag>
                                    <img
                                        src="/icons/Cancel.svg"
                                        className="cancel-btn"
                                        onClick={() => setApplicationSearch("")}
                                    />
                                </>
                            ) : (
                                ""
                            )}
                            {filterValues &&
                                Object.keys(filterValues).map((filterName) => (
                                    <>
                                        {filterValues[filterName] && (
                                            <>
                                                <Tag color="#49a843">{`${filterName} : ${filterValues[
                                                    filterName
                                                ].toLowerCase()} `}</Tag>
                                                <img
                                                    src="/icons/Cancel.svg"
                                                    alt=""
                                                    className="cancel-btn"
                                                    onClick={() => handleRemoveFilter(filterName)}
                                                />
                                            </>
                                        )}

                                    </>
                                ))}
                        </div>

                        <div className="application-list-container">
                            {isLoading ? (
                                <Skeleton active paragraph={20} />
                            ) : (
                                <>
                                    {applications?.data?.map((application) => (
                                        <div
                                            className="application-card-container"
                                            key={application.id}
                                            onClick={() => handleViewMore(application.id)}
                                        >
                                            <div className="application-details-container flex">
                                                <div className="application-info flex">
                                                    <div className="application-name-container">
                                                        <p>
                                                            {application.first_name[0].toUpperCase()}
                                                            {application.last_name[0].toUpperCase()}
                                                        </p>
                                                    </div>
                                                    <div className="application-email-container">
                                                        <p className="application-name">
                                                            <Tooltip
                                                                title={`${application.first_name
                                                                    .charAt(0)
                                                                    .toUpperCase()}${application.first_name.slice(
                                                                        1
                                                                    )} ${application.last_name
                                                                        .charAt(0)
                                                                        .toUpperCase()}${application.last_name.slice(
                                                                            1
                                                                        )}`}
                                                            >
                                                                {truncateText(
                                                                    `${application.first_name
                                                                        .charAt(0)
                                                                        .toUpperCase()}${application.first_name.slice(
                                                                            1
                                                                        )} ${application.last_name
                                                                            .charAt(0)
                                                                            .toUpperCase()}${application.last_name.slice(
                                                                                1
                                                                            )}`,
                                                                    15
                                                                )}
                                                            </Tooltip>
                                                        </p>
                                                        <p className="application-email">
                                                            {truncateText(application.email, 15)}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="application-gender">
                                                    <p>Gender</p>
                                                    <span>{application?.gender?.charAt(0).toUpperCase()}{application?.gender?.slice(1).toLowerCase()}</span>
                                                </div>
                                                <div className="application-dob">
                                                    <p>Date of Birth</p>
                                                    <span>
                                                        {dayjs(application.dob).format("MMM DD, YYYY")}
                                                    </span>
                                                </div>
                                                <div className="application-district">
                                                    <p>District</p>
                                                    <p className="district-heading">
                                                        {application.district}
                                                    </p>
                                                </div>
                                                <div className="application-qualification">
                                                    <p>Qualification</p>
                                                    <span>Diploma</span>
                                                </div>
                                                <div className="application-mobile-no">
                                                    <p>Mobile No</p>
                                                    <span>{application.contact_number}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {applications?.data?.length === 0 && (
                                        <div className="flex no-data-container flex" style={{ flexDirection: "column" }}>
                                            <img src="/icons/no-data.svg" className="no-data-image" />
                                            <span>There are currently no data available.</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                        <div className="application-pagination-container flex">
                            {applications.data.length > 0 && (
                                <Pagination
                                    className="pagination"
                                    current={applications.currentPage}
                                    pageSize={limit}
                                    total={applications.total}
                                    onChange={(page) => setPage(page)}
                                />
                            )}
                        </div>
                    </div>
                </>
            )}
        </main>
    )
}
export default ApplicationListView