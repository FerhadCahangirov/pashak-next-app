import React from 'react'

function SaveChangesButton({ loading, buttonText = "Save Changes", isLong = true }) {
    return (
        <button
            type="submit"
            disabled={loading ? true : false}
            className={`tf-btn ${isLong ? "w-100" : "w-20"} radius-3 btn-fill ${!loading && 'animate-hover-btn'} justify-content-center`}
            style={{ cursor: loading ? "not-allowed" : "pointer" }}
        >
            {
                loading ? "Loading..." : buttonText
            }
        </button>
    )
}

export default SaveChangesButton