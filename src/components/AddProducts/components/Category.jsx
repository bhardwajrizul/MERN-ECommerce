import { useState } from "react"


export default function Category({ categories, subCategories, selectCat, selectSubCat, updateCat, updateSubCat }) {
    return (
        <div>
            <div className="dropdown dropdown-right dropdown-start rounded-lg mr-3">
                <label tabIndex={0} className={`btn ${selectCat && 'btn-primary'} m-1`}>{selectCat ? selectCat : 'Select a Category'}</label>
                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                    {categories.map((category, index) => {
                        return <li key={`category_${index}`}><a onClick={() => updateCat(category)}>
                            {category}
                        </a></li>
                    })}
                </ul>
            </div>
            {
                selectCat && (
                    <div className="dropdown dropdown-right dropdown-start">
                        <label tabIndex={0} className={`btn ${selectSubCat && 'btn-secondary'} m-1`}>{selectSubCat ? selectSubCat : 'Select a Sub-Category'}</label>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                            {subCategories.map((subCat) => {
                                return <li><a onClick={() => updateSubCat(subCat)}>
                                    {subCat}
                                </a></li>
                            })}
                        </ul>
                    </div>
                )
            }
        </div>
    )
}