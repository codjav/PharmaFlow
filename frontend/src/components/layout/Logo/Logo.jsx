const Logo = () => {
    return (
        <div className="flex items-center gap-3 px-6 py-5 border-b">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-white text-2xl font-bold">
                P
            </div>
            <div>
                <h1 className="text-xl font-bold">
                    PharmaFlow
                </h1>
                <p className="text-sm text-gray-500">
                    Pharmacy ERP
                </p>
            </div>
        </div>
    );
};

export default Logo;
