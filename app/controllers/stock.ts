export const getData = (req: any, res: any) => {
    res.json({ message: 'This will return your moving average of: '+ req.params.symbol });
}

export const postTrigger = (req: any, res: any) => {
    res.json({ message: 'Your data polling started for: '+ req.params.symbol });
}