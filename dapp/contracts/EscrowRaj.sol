contract EscrowRaj {
    Buyer buyer;
    Seller seller;
    uint value;
    bool public locked;
    address arbitrator;
    uint timeout;
    string memo;

    struct Buyer {
        address account;
        address choice;
    }

    struct Seller {
        address account;
        address choice;
    }

    function EscrowRaj(uint myvalue, string myMemo) {
        buyer.account = msg.sender;
        value = myvalue;
        locked = false;
        memo = myMemo;
    }

    function setSeller(address sellerAddress) {
        if (msg.sender == buyer.account){
            seller.account = sellerAddress;
        }
    }

    function deposit(){
        if (this.balance > value){
            locked = true;
            timeout = block.number + (5 * 24 * 60 * 4); //Default timeout time of 5 days
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

        if (buyer.choice == seller.choice){
            arbitrator = buyer.choice;
        }
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

    function (){ //fallback function
        if (this.balance > value){
                locked = true;
                timeout = block.number + (5 * 24 * 60 * 4); //Default timeout time of 5 days
        }
    }
}
