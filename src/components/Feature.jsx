import Panel from './Panel'

/* eslint-disable */


export default function Feature({ title, description, Icon }) {
    return (
        <Panel className="bg-base-100 p-8 flex flex-col items-center justify-start border hover:drop-shadow-2xl">
            <Panel className='bg-base-100 flex text-3xl items-center'>
                <Icon className='me-2' />
                <h1 className="font-h text-3xl underline items-middle">
                    {title}
                </h1>
            </Panel>
            <Panel className="bg-base-100 flex font-t flex-col w-96 text-lg mt-4 text-gray-500">
                <p className=" font-t">
                    {description}
                </p>
            </Panel>
        </Panel>
    )
}