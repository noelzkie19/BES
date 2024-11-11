const ActionEnumQuote: any = {
    PrintQuote: 'Print Quote',
    EmailQuote: 'Email Quote',
    ConvertJob: 'Convert to Job',
    ResendQuote: 'Resend Quote',
    SendQuote: 'Send Quote'
}

const ActionEnumPO: any = {
    Rec: 'Receipt',
    Hist: 'History',
}

const ActionEnumJob: any = {
    JobCard: 'JobCard',
    CopyJob: 'CopyJob',
    SubAssembly: 'SubAssembly',
    ConfirmJob: 'ConfirmJob',
    Delivery: 'Delivery',
}

const ActionEnumDelivery: any = {
    Undo: 'Undo',
    PrintDelivery: 'PrintDelivery'
}


export const ActionEnum: any = {
    Edit: 'Edit',
    View: 'View',
    Delete: 'Delete',
    ...ActionEnumQuote,
    ...ActionEnumPO,
    ...ActionEnumJob,
    ...ActionEnumDelivery
}

export const ActionOption: any = {
    Edit: {
        action: ActionEnum.Edit,
        icon: 'pencil',
        color: 'text-info',
        hoverText: 'Edit Record'
    },
    View: {
        action: ActionEnum.View,
        icon: 'view',
        color: 'text-info',
        hoverText: 'View Record'
    },
    Delete: {
        action: ActionEnum.Delete,
        icon: 'trash',
        color: 'text-danger',
        hoverText: 'Delete Record'
    },
    Rec: {
        action: ActionEnum.Rec,
        icon: 'receipt-cutoff',
        color: 'text-danger',
        hoverText: 'Add Receipt'
    },
    Hist: {
        action: ActionEnum.Hist,
        icon: 'clock-history',
        color: 'text-danger',
        hoverText: 'View History'
    },
    UndoDelivery: {
        action: ActionEnum.Undo,
        icon: 'arrow-counterclockwise',
        color: 'text-danger',
        hoverText: 'Undo Record'
    },
    PrintDelivery: {
        action: ActionEnum.PrintDelivery,
        icon: 'printer',
        color: 'text-danger',
        hoverText: 'Print Record'
    }
}