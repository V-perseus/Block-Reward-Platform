# @Developer    : Sebastian Tarasiuk
# @Start Date   : 2022-10-20
# @Project Name : BRT Token Contract
 
from pyteal import *

# roles == 1 => admin and roles == 0 => common user 

def approval_program():
    on_creation = Seq(
        [
         App.globalPut(Bytes("totalSupply"), Int(500000000000000000)),
         App.globalPut(Bytes("capacity"), Int(1000000000000000000)),
         App.globalPut(Bytes("reserve"), Int(500000000000000000)),
         Assert(Txn.application_args.length() == Int(4)),
         App.globalPut(Bytes("decimals"),Int(18)),
         App.globalPut(Bytes("symbol"),Bytes("BRT")),
         App.globalPut(Bytes("name"), Bytes("BlockReward Token")),
         App.localPut(Int(0), Bytes("roles"), Int(1)),
         App.localPut(Int(0),Bytes("balance"),App.globalGet(Bytes("totalSupply"))),
         Return(Int(1)),
        ]
    )
    is_admin = App.localGet(Int(0), Bytes("roles"))

    on_register = Seq(
        [
         App.localPut(Int(0),Bytes("balance"),Int(0)),
         App.localPut(Int(0), Bytes("roles"), Int(0)),
         Return(Int(1))
        ]
    )   
    sender_amount = Btoi(Txn.application_args[1])
    on_send = Seq(
        [   
            Assert(And(
            Txn.accounts.length() == Int(1),
            isAllowedSend(Int(0),sender_amount)
            )),
            App.localPut(Int(0),Bytes("balance"),App.globalGet(Bytes("totalSupply")) - sender_amount),
            App.localPut(Int(1),Bytes("balance"),sender_amount),
            Return(Int(1)),
        ]
    )
    program = Cond(
        [Txn.application_id() == Int(0), on_creation],
        [Txn.on_completion() == OnComplete.DeleteApplication, Return(Int(1))],
        [Txn.on_completion() == OnComplete.UpdateApplication, Return(Int(1))],
        [Txn.on_completion() == OnComplete.CloseOut, Return(Int(1))],
        [Txn.on_completion() == OnComplete.OptIn, on_register],
        [Txn.application_args[0] == Bytes("send"), on_send],
    )
    return program

def clear_state_program():
    program = Seq(
        [
           
           App.globalPut(
             Bytes("reserve"),
             App.globalGet(Bytes("reserve")) + App.localGet(Int(0),Bytes("balance"))
            ),
           Return(Int(1)),
        ]
    )
    return program

def isAllowedSend(sender_id, amount):
    return Not(Lt(App.localGet(sender_id,Bytes("balance")),amount))

if __name__ == "__main__":
    with open("my_approval.teal", "w") as f:
        compiled = compileTeal(approval_program(), mode=Mode.Application, version=5)
        f.write(compiled)

    with open("my_clear_state.teal", "w") as f:
        compiled = compileTeal(clear_state_program(), mode=Mode.Application, version=5)
        f.write(compiled)