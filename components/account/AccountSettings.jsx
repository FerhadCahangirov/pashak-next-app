import React from 'react'
import ChangeEmail from "./ChangeEmail"
import ResetPassword from "./ResetPassword"

function AccountSettings() {
    return (
        <div className="my-account-content account-edit">
            <ChangeEmail/>
            <ResetPassword/>
        </div>
    )
}

export default AccountSettings