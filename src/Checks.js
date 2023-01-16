import React from "react"

const Checks = () => {
    return (
        <form className="walkthrough">
            <input type="checkbox" id="check1" name="check1" />
            <label htmlFor="check1"> Check Programs</label><br />
            <input type="checkbox" id="check2" name="check2" />
            <label htmlFor="check2"> Trim Promos</label><br />
            <input type="checkbox" id="check32" name="check32" />
            <label htmlFor="check32"> Check Fixed Events</label><br />
            <input type="checkbox" id="check3" name="check3" />
            <label htmlFor="check3"> Check ZC</label><br />
            <input type="checkbox" id="check4" name="check4" />
            <label htmlFor="check4"> Check File Segments</label><br />
            <input type="checkbox" id="check5" name="check5" />
            <label htmlFor="check5"> Check Event Exits</label><br />
            <input type="checkbox" id="check6" name="check6" />
            <label htmlFor="check6"> Import to MAIN</label><br />
            <input type="checkbox" id="check62" name="check62" />
            <label htmlFor="check62"> Check Time Gaps MAIN</label><br />
            <input type="checkbox" id="check6" name="check6" />
            <label htmlFor="check6"> Import to BACKUP</label><br />
            <input type="checkbox" id="check61" name="check61" />
            <label htmlFor="check61"> Check Time Gaps BACKUP</label><br />
        </form>
    )
}

export default Checks