// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import {DwavesToken} from "./DwavesToken.sol";

contract ICO is Ownable {
    using SafeMath for uint256;

    mapping(address => uint256) public contributions;
    mapping(address => uint256) public caps;

    DwavesToken token;
    address payable wallet;
    uint256 rate;
    uint256 cap;
    uint256 weiRaised;
    uint256 openingTime;
    uint256 closingTime;

    event TokenPurchase(
        address indexed purchaser,
        address indexed investor,
        uint256 value,
        uint256 amount
    );

    modifier onlyWhileOpen() {
        require(
            block.timestamp >= openingTime && block.timestamp <= closingTime
        );
        _;
    }

    constructor(
        DwavesToken _token,
        address payable _wallet,
        uint256 _rate,
        uint256 _cap,
        uint256 _openingTime,
        uint256 _closingTime
    ) {
        require(_wallet != address(0));
        require(_rate > 0);
        require(_cap > 0);
        require(_openingTime >= block.timestamp);
        require(_closingTime >= _openingTime);

        token = _token;
        wallet = _wallet;
        rate = _rate;
        cap = _cap;
        openingTime = _openingTime;
        closingTime = _closingTime;
    }

    receive() external payable {
        buyTokens(msg.sender);
    }

    function capReached() external view returns (bool) {
        return weiRaised >= cap;
    }

    function hasClosed() external view returns (bool) {
        return block.timestamp > closingTime;
    }

    function setUserCap(address _investor, uint256 _cap) external onlyOwner {
        caps[_investor] = _cap;
    }

    function setGroupCap(address[] calldata _investors, uint256 _cap)
        external
        onlyOwner
    {
        for (uint256 i = 0; i < _investors.length; i++) {
            caps[_investors[i]] = _cap;
        }
    }

    function buyTokens(address _investor) public payable onlyWhileOpen {
        uint256 weiAmount = msg.value;

        require(_investor != address(0));
        require(weiAmount != 0);
        require(weiRaised.add(weiAmount) <= cap);
        require(contributions[_investor].add(weiAmount) <= caps[_investor]);

        uint256 tokens = weiAmount.mul(rate);
        weiRaised = weiRaised.add(weiAmount);

        token.transfer(_investor, tokens);
        emit TokenPurchase(msg.sender, _investor, weiAmount, tokens);
        wallet.transfer(weiAmount);
    }
}