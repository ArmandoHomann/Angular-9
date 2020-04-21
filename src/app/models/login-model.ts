import { Deserializable } from 'src/app/models/deserializable.model';

// Login model that will keep data for i-Con WS
export class Login implements Deserializable
{
    ResultCode : string;
    ResultDescription : string;

    deserialize(input: any): this {
        return Object.assign(this, input)
    }

    GetLoginResult()
    {
        return this.ResultCode + ":" + this.ResultDescription;
    }
}