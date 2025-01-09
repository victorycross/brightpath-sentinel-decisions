interface AuthHeaderProps {
  title: string
}

export const AuthHeader = ({ title }: AuthHeaderProps) => {
  return <h1 className="text-2xl font-bold text-center mb-6">{title}</h1>
}