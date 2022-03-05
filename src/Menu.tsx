import React, { lazy } from "react"
import { Link } from "react-router-dom";

const Concept = lazy(() => import("./concept/Concept"))
const Realtime = lazy(() => import("./realtime/Realtime"))
const ZDT = lazy(() => import("./zdtchart/ZDT"))

export const Paths = [{
    path: '/',
    name: 'index',
    el: Concept
}, {
    path: 'concept',
    name: '同花顺概念',
    el: Concept
}, {
    path: 'realtime',
    name: '同花顺实时消息',
    el: Realtime
}, {
    path: 'zdt-chart',
    name: '涨跌停 Chart',
    el: ZDT
}]

export default function Menu() {

    return (
        <React.Fragment>
            <a href="#menu" role="button" className="position-fixed top-0 end-0" data-bs-toggle="offcanvas"
                aria-controls="menu">
                <i className="bi bi-list" />
            </a>
            <div className="offcanvas offcanvas-end" tabIndex={-1} id="menu"
                aria-labelledby="offcanvasRightLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title" id="offcanvasRightLabel">Menu</h5>
                    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"
                        aria-label="Close" />
                </div>
                <div className="offcanvas-body">
                    <ul className="nav flex-column">
                        {Paths.map(item => {
                            let active = ""
                            let aria = {} as any
                            if (item.path === window.location.pathname) {
                                active = 'active'
                                aria['aria-current'] = "page"
                            }

                            return (
                                <li className="nav-item" key={item.path}>
                                    <Link to={item.path} className={`nav-link ${active}`} {...aria}
                                        href={item.path}>{item.name}</Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
        </React.Fragment>
    )
}