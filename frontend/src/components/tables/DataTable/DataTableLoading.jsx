const DataTableLoading = () => {
  return (
    <tbody>
        {
            Array.from({
                length: 8
            }).map((_, index)=>(
                <tr
                    key={index}
                    className="border-b"
                >
                    {
                        Array.from({
                            length: 8
                        }).map((_, i)=> (
                            <td
                                key={i}
                                className="p-4"
                            >
                                <div className="h-5 animate-pulse rounded bg-slate-200" />
                            </td>
                        ))
                    }
                </tr>
            ))
        }
    </tbody>
  );
};

export default DataTableLoading;
