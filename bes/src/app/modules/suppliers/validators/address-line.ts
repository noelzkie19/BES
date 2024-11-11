
import { ISupplierAddress } from "../models/supplier-model";

export const validateAddresses = (addresses: ISupplierAddress[]) => {
    const validate: string[] = [];
    (addresses || []).map((address, index) => {
        if (address.addressType.length === 0
            || address.street.length === 0
            || address.state.length === 0
            || address.suburb.length === 0
            || address.postCode.length === 0) {
            validate.push(`Please complete address details in row ${index + 1}`)
        }
    })
    return validate;
  }
  