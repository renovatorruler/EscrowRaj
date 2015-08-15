contract EscrowRaj {
    Buyer buyer;
    Seller seller;
    uint value;
    bool locked;
    address arbitrator
    uint timeout

    struct Buyer {
        address account;
        address choice;
    }

    struct Seller {
        address account;
        address choice;
    }

    function EscrowRaj(uint myvalue) {
        buyer.account = msg.sender;
        value = myvalue;
        locked = false;
    }

    function setSeller(address sellerAddress) {
        if (msg.sender == buyer.account){
            seller.account = sellerAddress;
        }
    }

    function deposit{
        if (this.balance > value){
            locked = true;
            timeout = block.number + (5 * 24 * 60 * 4);
        }
    }

    function release(){
        if (msg.sender == buyer.account){
            if (locked){
                suicide(seller.account);
            }
        }

        if (msg.sender == seller.account){
            if (locked && block.number > timeout){
                suicide(seller.account);
            }
        }
    }

    function void(){
        if (!locked && (msg.sender == buyer.account || msg.sender == seller.account)){
            suicide(buyer.account);
        }
    }

    function setArbitrator(address arb){
        if (msg.sender == buyer.account){
            buyer.choice = arb;
        }

        if (msg.sender == seller.account){
            seller.choice = arb;
        }

        if (buyer.choice = seller.choice){
            arbitrator = buyer.choice;
        }
    }

    function arbAddress(bytes64 pubKey){
        return sha3(pubKey) << 96;
    }

    function judge(bool fulfilled){ //True means contract was fulfilled, money released to seller
        if (msg.sender == arbitrator && locked){
            if (fulfilled){
                seller.account.send(this.balance);
            } else {
                buyer.account.send(this.balance);
            }
        }
    }
}
