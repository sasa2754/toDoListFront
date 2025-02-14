
interface ICard {
    title: string,
    description: string,
    completed: boolean,
    createdAt: Date,
    updatedAt: Date
}

export const Card = ({ title, description, completed, createdAt, updatedAt } : ICard) => {
    return (
        <div className="rounded-xl p-3 w-72 object-cover flex flex-col items-center justify-between bg-neutral-50 dark:bg-sky-800 dark:text-white shadow-xl transition ease-in-out hover:scale-110">
            <h1 className="font-bold text-2xl mb-2">{title}</h1>
            <h2 className="text-lg">Raça: {description}</h2>
        </div>
    )
}