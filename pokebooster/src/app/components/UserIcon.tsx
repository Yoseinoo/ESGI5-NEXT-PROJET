type Props = { name: string };

export function UserIcon({ name }: Props) {
    return (
        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-white font-bold text-lg shadow">
            {name.charAt(0).toUpperCase()}
        </div>
    );
}
