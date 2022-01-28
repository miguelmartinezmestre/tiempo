import PropTypes from "prop-types"

export default function Header({titulo}) {
    return(
        <nav>
            <div className="nav-wrapper light-blue darken-2">
                <a href="#!" className="brand-logo ">{titulo}</a>
            </div>
        </nav>
    )
}

Header.propsTypes = {
    titulo: PropTypes.string.isRequired
}
