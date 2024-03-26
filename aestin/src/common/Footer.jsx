import React, { useState, useContext, useEffect } from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { IoIosArrowUp } from "react-icons/io";
import { IoChevronForward } from "react-icons/io5";
import { Link } from 'react-router-dom';
import i18next from "i18next"
import { CurrencyContext } from '../context/currencyContext';
import { useTranslation } from 'react-i18next'
import { API_URL, CURRENCY_LIST } from './constants';

const Footer = () => {
    const { t } = useTranslation();
    const { currency, setCurrencyState, currencySymbol, setCurrencySymbolState, region, setRegionState } = useContext(CurrencyContext);

    const [isLang_selection, setIsLang_selection] = useState(false)
    const [isCurrency_selection, setIsCurrency_selection] = useState(false)

    const [selectedRegion, setSelectedRegion] = useState({
        Value: 'en-us',
        region: 'English',
    })

    const [selectedCurrency, setSelectedCurrency] = useState({
        value: 'US',
        region: 'United States (USD $)',
        currency: '$',
        name: 'USD'
    })

    const toggleRegionSelectorList = () => {
        setIsLang_selection(!isLang_selection);
        setIsCurrency_selection(false)
    }

    const toggleCurrencySelectorList = () => {
        setIsCurrency_selection(!isCurrency_selection);
        setIsLang_selection(false)
    }

    const handleClickedRegion = (event) => {
        const selectedValue = event.target.getAttribute('data-value');
        const RegionName = event.target.textContent;
        setSelectedRegion({
            Value: selectedValue,
            region: RegionName.trim(),
        });
        i18next.changeLanguage(selectedValue)
        setIsLang_selection(false)
    }

    const handleClickedCurrency = (event) => {
        const selectedValue = event.target.getAttribute('data-value');
        const selectedName = event.target.getAttribute('data-name');
        const selectedSymbol = event.target.getAttribute('data-symbol');
        const RegionName = event.target.textContent;
        setSelectedCurrency({
            value: selectedValue,
            name: selectedName,
            currency: selectedSymbol,
            region: RegionName.trim(),
        });
        setIsCurrency_selection(false)
    }

    useEffect(() => {
        setCurrencyState(selectedCurrency.name)
        setRegionState(selectedCurrency.value)
        setCurrencySymbolState(selectedCurrency.currency)
    }, [selectedCurrency])

    const getVisitorsLocation = async () => {
        try {
            const response = await fetch(`${API_URL}/customer/region`);
            const data = await response.json();
            console.log(data)
            if (data.success) {
                const currentRegion = CURRENCY_LIST.find(item => item.value === data.data.country_code);

                setSelectedCurrency({
                    value: currentRegion.value,
                    name: currentRegion.name,
                    currency: currentRegion.symbol,
                    region: `${currentRegion.country} (${currentRegion.name} ${currentRegion.symbol})`
                });
            }

        } catch (error) {
            console.log("Failed to get the region : " + error.message);
        }
    };

    // useEffect(() => {
    //     let i18n_Language = i18next.language;
    //     const currentRegion = CURRENCY_LIST.find(item => item.value === i18n_Language.toUpperCase());
    //     setSelectedRegion({
    //         Value: i18n_Language,
    //         region: `${currentRegion.country} (${i18n_Language})`,
    //     });
    // }, [])

    useEffect(() => {
        getVisitorsLocation()
    }, [])


    return (
        <footer className='hidden md:block'>
            <div className="footer_interior py-16 mx-auto flex max-sm:flex-col justify-between w-11/12 gap-y-12">
                <div className='useful_links flex max-sm:flex-col gap-x-16 gap-y-14'>
                    <div>
                        <h6 className='mb-6 max-sm:mb-4'>{t('footer.May We Help You ?')}</h6>
                        <ul type='none'>
                            <li><Link to="/contact-us">{t('footer.Contact Us')}</Link></li>
                            <li><Link to="/about-us">{t('footer.About Us')}</Link></li>
                            <li><Link to="/frequency-asked-question">{t('footer.FAQs')}</Link></li>
                            <li><Link to="/client-services">{t('footer.Client Services')}</Link></li>
                            <li><Link to="/notify">{t('footer.Apprise New')}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h6 className='mb-6 max-sm:mb-4'>{t('footer.The Company')}</h6>
                        <ul type='none'>
                            <li><Link to="/career">{t('footer.Career')}</Link></li>
                            <li><Link to="/blog">{t('update.Blog')}</Link></li>
                            <li><Link to="/privacy-policy">{t('footer.Legal Notices')}</Link></li>
                            <li><Link to="/cookie-settings">{t('footer.Cookie Policy')}</Link></li>
                            <li><Link to="/return-policy">{t('footer.Return & Exchange')}</Link></li>
                        </ul>
                    </div>
                </div>
                <div className='social_icons flex max-sm:items-start flex-col justify-start gap-y-12'>
                    <ul className='selection_list_container'>
                        <li id='currency_selection' className='flex gap-7 align-baseline'>
                            <span className='font-bold'>Region</span>
                            <form className='w-fit flex flex-col-reverse'>
                                <button type='button' className='flex items-center gap-2' onClick={toggleCurrencySelectorList}>{selectedCurrency.region} {isCurrency_selection ? <IoIosArrowUp className="text-base" /> : <IoChevronForward className="text-base" />}</button>
                                {isCurrency_selection && (<ul role="list" className={`currencyList disclosure__list mb-3 left-1/3 p-3 max-sm:left-full max-sm:shadow-lg flex flex-col items-start gap-2`}>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AL' data-value="AL" data-name="ALL" data-symbol='L'>
                                            Albania (ALL L)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='DZ' data-value="DZ" data-name="DZD" data-symbol='د.ج'>
                                            Algeria (DZD د.ج)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AD' data-value="AD" data-name="EUR" data-symbol='€'>
                                            Andorra (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AO' data-value="AO" data-name="AOA" data-symbol='Kz'>
                                            Angola (AOA Kz)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AI' data-value="AI" data-name="XCD" data-symbol='$'>
                                            Anguilla (XCD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AG' data-value="AG" data-name="XCD" data-symbol='$'>
                                            Antigua &amp; Barbuda (XCD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AR' data-value="AR" data-name="ARS" data-symbol='$'>
                                            Argentina (ARS $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AM' data-value="AM" data-name="AMD" data-symbol='դր.'>
                                            Armenia (AMD դր.)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AW' data-value="AW" data-name="AWG" data-symbol='ƒ'>
                                            Aruba (AWG ƒ)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AU' data-value="AU" data-name="AUD" data-symbol='$'>
                                            Australia (AUD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AT' data-value="AT" data-name="EUR" data-symbol='€'>
                                            Austria (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AZ' data-value="AZ" data-name="AZN" data-symbol='₼'>
                                            Azerbaijan (AZN ₼)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BS' data-value="BS" data-name="BSD" data-symbol='$'>
                                            Bahamas (BSD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BH' data-value="BH" data-name="USD" data-symbol='$'>
                                            Bahrain (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BD' data-value="BD" data-name="BDT" data-symbol='৳'>
                                            Bangladesh (BDT ৳)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BB' data-value="BB" data-name="BBD" data-symbol='$'>
                                            Barbados (BBD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BE' data-value="BE" data-name="EUR" data-symbol='€'>
                                            Belgium (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BZ' data-value="BZ" data-name="BZD" data-symbol='$'>
                                            Belize (BZD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BJ' data-value="BJ" data-name="XOF" data-symbol='Fr'>
                                            Benin (XOF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BM' data-value="BM" data-name="USD" data-symbol='$'>
                                            Bermuda (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BT' data-value="BT" data-name="USD" data-symbol='$'>
                                            Bhutan (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BO' data-value="BO" data-name="BOB" data-symbol='Bs.'>
                                            Bolivia (BOB Bs.)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BA' data-value="BA" data-name="BAM" data-symbol='КМ'>
                                            Bosnia &amp; Herzegovina (BAM КМ)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BW' data-value="BW" data-name="BWP" data-symbol='P'>
                                            Botswana (BWP P)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BR' data-value="BR" data-name="BRL" data-symbol='R$'>
                                            Brazil (BRL R$)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='VG' data-value="VG" data-name="USD" data-symbol='$'>
                                            British Virgin Islands (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BN' data-value="BN" data-name="BND" data-symbol='$'>
                                            Brunei (BND $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BG' data-value="BG" data-name="BGN" data-symbol='лв.'>
                                            Bulgaria (BGN лв.)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BF' data-value="BF" data-name="XOF" data-symbol='Fr'>
                                            Burkina Faso (XOF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BI' data-value="BI" data-name="BIF" data-symbol='Fr'>
                                            Burundi (BIF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='KH' data-value="KH" data-name="KHR" data-symbol='៛'>
                                            Cambodia (KHR ៛)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CM' data-value="CM" data-name="XAF" data-symbol='Fr'>
                                            Cameroon (XAF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CA' data-value="CA" data-name="CAD" data-symbol='$'>
                                            Canada (CAD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CV' data-value="CV" data-name="CVE" data-symbol='$'>
                                            Cape Verde (CVE $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='KY' data-value="KY" data-name="KYD" data-symbol='$'>
                                            Cayman Islands (KYD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TD' data-value="TD" data-name="XAF" data-symbol='Fr'>
                                            Chad (XAF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CL' data-value="CL" data-name="CLP" data-symbol='$'>
                                            Chile (CLP $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CN' data-value="CN" data-name="CNY" data-symbol='¥'>
                                            China (CNY ¥)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CO' data-value="CO" data-name="COP" data-symbol='$'>
                                            Colombia (COP $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='KM' data-value="KM" data-name="KMF" data-symbol='Fr'>
                                            Comoros (KMF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CD' data-value="CD" data-name="CDF" data-symbol='Fr'>
                                            Congo - Kinshasa (CDF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CK' data-value="CK" data-name="NZD" data-symbol='$'>
                                            Cook Islands (NZD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CR' data-value="CR" data-name="CRC" data-symbol='₡'>
                                            Costa Rica (CRC ₡)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CI' data-value="CI" data-name="XOF" data-symbol='Fr'>
                                            Côte d’Ivoire (XOF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='HR' data-value="HR" data-name="EUR" data-symbol='€'>
                                            Croatia (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CW' data-value="CW" data-name="ANG" data-symbol='ƒ'>
                                            Curaçao (ANG ƒ)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CY' data-value="CY" data-name="EUR" data-symbol='€'>
                                            Cyprus (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CZ' data-value="CZ" data-name="CZK" data-symbol='Kč'>
                                            Czechia (CZK Kč)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='DK' data-value="DK" data-name="DKK" data-symbol='kr.'>
                                            Denmark (DKK kr.)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='DJ' data-value="DJ" data-name="DJF" data-symbol='Fdj'>
                                            Djibouti (DJF Fdj)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='DM' data-value="DM" data-name="XCD" data-symbol='$'>
                                            Dominica (XCD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='DO' data-value="DO" data-name="DOP" data-symbol='$'>
                                            Dominican Republic (DOP $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='EC' data-value="EC" data-name="USD" data-symbol='$'>
                                            Ecuador (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='EG' data-value="EG" data-name="EGP" data-symbol='ج.م'>
                                            Egypt (EGP ج.م)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SV' data-value="SV" data-name="USD" data-symbol='$'>
                                            El Salvador (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GQ' data-value="GQ" data-name="XAF" data-symbol='Fr'>
                                            Equatorial Guinea (XAF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='EE' data-value="EE" data-name="EUR" data-symbol='€'>
                                            Estonia (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SZ' data-value="SZ" data-name="SZL" data-symbol='E'>
                                            Eswatini (SZL E)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='ET' data-value="ET" data-name="ETB" data-symbol='Br'>
                                            Ethiopia (ETB Br)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='FK' data-value="FK" data-name="FKP" data-symbol='£'>
                                            Falkland Islands (FKP £)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='FO' data-value="FO" data-name="DKK" data-symbol='kr.'>
                                            Faroe Islands (DKK kr.)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='FJ' data-value="FJ" data-name="FJD" data-symbol='$'>
                                            Fiji (FJD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='FI' data-value="FI" data-name="EUR" data-symbol='€'>
                                            Finland (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='FR' data-value="FR" data-name="EUR" data-symbol='€'>
                                            France (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GF' data-value="GF" data-name="EUR" data-symbol='€'>
                                            French Guiana (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='PF' data-value="PF" data-name="XPF" data-symbol='Fr'>
                                            French Polynesia (XPF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GA' data-value="GA" data-name="USD" data-symbol='$'>
                                            Gabon (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GE' data-value="GE" data-name="GEL" data-symbol='ლ'>
                                            Georgia (GEL ლ)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='DE' data-value="DE" data-name="EUR" data-symbol='€'>
                                            Germany (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GH' data-value="GH" data-name="USD" data-symbol='$'>
                                            Ghana (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GI' data-value="GI" data-name="GBP" data-symbol='£'>
                                            Gibraltar (GBP £)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GR' data-value="GR" data-name="EUR" data-symbol='€'>
                                            Greece (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GL' data-value="GL" data-name="DKK" data-symbol='kr.'>
                                            Greenland (DKK kr.)
                                        </Link>
                                    </li>
                                    {/* \\ */}
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GD' data-value="GD" data-name="XCD" data-symbol='$'>
                                            Grenada (XCD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GP' data-value="GP" data-name="EUR" data-symbol='€'>
                                            Guadeloupe (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GT' data-value="GT" data-name="GTQ" data-symbol='Q'>
                                            Guatemala (GTQ Q)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GG' data-value="GG" data-name="GBP" data-symbol='£'>
                                            Guernsey (GBP £)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GN' data-value="GN" data-name="GNF" data-symbol='Fr'>
                                            Guinea (GNF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GW' data-value="GW" data-name="XOF" data-symbol='Fr'>
                                            Guinea-Bissau (XOF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GY' data-value="GY" data-name="GYD" data-symbol='$'>
                                            Guyana (GYD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='HT' data-value="HT" data-name="HTG" data-symbol='G'>
                                            Haiti (HTG G)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='HN' data-value="HN" data-name="HNL" data-symbol='L'>
                                            Honduras (HNL L)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='HK' data-value="HK" data-name="HKD" data-symbol='$'>
                                            Hong Kong SAR (HKD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='HU' data-value="HU" data-name="HUF" data-symbol='Ft'>
                                            Hungary (HUF Ft)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='IS' data-value="IS" data-name="ISK" data-symbol='kr'>
                                            Iceland (ISK kr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='IN' data-value="IN" data-name="INR" data-symbol='₹'>
                                            India (INR ₹)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='ID' data-value="ID" data-name="IDR" data-symbol='Rp'>
                                            Indonesia (IDR Rp)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='IE' data-value="IE" data-name="EUR" data-symbol='€'>
                                            Ireland (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='IM' data-value="IM" data-name="GBP" data-symbol='£'>
                                            Isle of Man (GBP £)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='IL' data-value="IL" data-name="ILS" data-symbol='₪'>
                                            Israel (ILS ₪)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='IT' data-value="IT" data-name="EUR" data-symbol='€'>
                                            Italy (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='JM' data-value="JM" data-name="JMD" data-symbol='$'>
                                            Jamaica (JMD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='JP' data-value="JP" data-name="JPY" data-symbol='¥'>
                                            Japan (JPY ¥)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='JE' data-value="JE" data-name="GBP" data-symbol='£'>
                                            Jersey (GBP £)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='JO' data-value="JO" data-name="USD" data-symbol='$'>
                                            Jordan (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='KZ' data-value="KZ" data-name="KZT" data-symbol='〒'>
                                            Kazakhstan (KZT 〒)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='KE' data-value="KE" data-name="KES" data-symbol='KSh'>
                                            Kenya (KES KSh)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='KI' data-value="KI" data-name="USD" data-symbol='$'>
                                            Kiribati (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='KW' data-value="KW" data-name="USD" data-symbol='$'>
                                            Kuwait (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='KG' data-value="KG" data-name="KGS" data-symbol='som'>
                                            Kyrgyzstan (KGS som)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='LA' data-value="LA" data-name="LAK" data-symbol='₭'>
                                            Laos (LAK ₭)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='LV' data-value="LV" data-name="EUR" data-symbol='€'>
                                            Latvia (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='LB' data-value="LB" data-name="LBP" data-symbol='ل.ل'>
                                            Lebanon (LBP ل.ل)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='LS' data-value="LS" data-name="LSL" data-symbol='L'>
                                            Lesotho (LSL L)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='LR' data-value="LR" data-name="LRD" data-symbol='$'>
                                            Liberia (LRD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='LI' data-value="LI" data-name="CHF" data-symbol='CHF'>
                                            Liechtenstein (CHF CHF)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='LT' data-value="LT" data-name="EUR" data-symbol='€'>
                                            Lithuania (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='LU' data-value="LU" data-name="EUR" data-symbol='€'>
                                            Luxembourg (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MO' data-value="MO" data-name="MOP" data-symbol='P'>
                                            Macao SAR (MOP P)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MG' data-value="MG" data-name="USD" data-symbol='$'>
                                            Madagascar (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MW' data-value="MW" data-name="MWK" data-symbol='MK'>
                                            Malawi (MWK MK)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MY' data-value="MY" data-name="MYR" data-symbol='RM'>
                                            Malaysia (MYR RM)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MV' data-value="MV" data-name="MVR" data-symbol='MVR'>
                                            Maldives (MVR MVR)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MT' data-value="MT" data-name="EUR" data-symbol='€'>
                                            Malta (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MQ' data-value="MQ" data-name="EUR" data-symbol='€'>
                                            Martinique (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MR' data-value="MR" data-name="USD" data-symbol='$'>
                                            Mauritania (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MU' data-value="MU" data-name="MUR" data-symbol='₨'>
                                            Mauritius (MUR ₨)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='YT' data-value="YT" data-name="EUR" data-symbol='€'>
                                            Mayotte (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MX' data-value="MX" data-name="MXN" data-symbol='$'>
                                            Mexico (MXN $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MD' data-value="MD" data-name="MDL" data-symbol='L'>
                                            Moldova (MDL L)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MC' data-value="MC" data-name="EUR" data-symbol='€'>
                                            Monaco (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MN' data-value="MN" data-name="MNT" data-symbol='₮'>
                                            Mongolia (MNT ₮)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='ME' data-value="ME" data-name="EUR" data-symbol='€'>
                                            Montenegro (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MS' data-value="MS" data-name="XCD" data-symbol='$'>
                                            Montserrat (XCD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MA' data-value="MA" data-name="MAD" data-symbol='د.م.'>
                                            Morocco (MAD د.م.)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MZ' data-value="MZ" data-name="MZN" data-symbol='MTn'>
                                            Mozambique (MZN MTn)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='NA' data-value="NA" data-name="NAD" data-symbol='$'>
                                            Namibia (NAD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='NR' data-value="NR" data-name="AUD" data-symbol='$'>
                                            Nauru (AUD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='NP' data-value="NP" data-name="NPR" data-symbol='₨'>
                                            Nepal (NPR ₨)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='NL' data-value="NL" data-name="EUR" data-symbol='€'>
                                            Netherlands (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='NC' data-value="NC" data-name="XPF" data-symbol='Fr'>
                                            New Caledonia (XPF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='NZ' data-value="NZ" data-name="NZD" data-symbol='$'>
                                            New Zealand (NZD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='NI' data-value="NI" data-name="NIO" data-symbol='$'>
                                            Nicaragua (NIO C$)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='NG' data-value="NG" data-name="NGN" data-symbol='₦'>
                                            Nigeria (NGN ₦)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='NU' data-value="NU" data-name="NZD" data-symbol='$'>
                                            Niue (NZD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MK' data-value="MK" data-name="MKD" data-symbol='ден'>
                                            North Macedonia (MKD ден)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='NO' data-value="NO" data-name="NOK" data-symbol='kr'>
                                            Norway (NOK kr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='OM' data-value="OM" data-name="USD" data-symbol='$'>
                                            Oman (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='PK' data-value="PK" data-name="PKR" data-symbol='₨'>
                                            Pakistan (PKR ₨)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='PA' data-value="PA" data-name="USD" data-symbol='$'>
                                            Panama (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='PG' data-value="PG" data-name="PGK" data-symbol='K'>
                                            Papua New Guinea (PGK K)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='PY' data-value="PY" data-name="PYG" data-symbol='₲'>
                                            Paraguay (PYG ₲)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='PE' data-value="PE" data-name="PEN" data-symbol='S/.'>
                                            Peru (PEN S/.)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='PH' data-value="PH" data-name="PHP" data-symbol='₱'>
                                            Philippines (PHP ₱)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='PL' data-value="PL" data-name="PLN" data-symbol='zł'>
                                            Poland (PLN zł)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='PT' data-value="PT" data-name="EUR" data-symbol='€'>
                                            Portugal (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='QA' data-value="QA" data-name="QAR" data-symbol='ر.ق'>
                                            Qatar (QAR ر.ق)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='RE' data-value="RE" data-name="EUR" data-symbol='€'>
                                            Réunion (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='RO' data-value="RO" data-name="RON" data-symbol='Lei'>
                                            Romania (RON Lei)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='RW' data-value="RW" data-name="RWF" data-symbol='FRw'>
                                            Rwanda (RWF FRw)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='WS' data-value="WS" data-name="WST" data-symbol='T'>
                                            Samoa (WST T)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SM' data-value="SM" data-name="EUR" data-symbol='€'>
                                            San Marino (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='ST' data-value="ST" data-name="STD" data-symbol='Db'>
                                            São Tomé &amp; Príncipe (STD Db)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SA' data-value="SA" data-name="SAR" data-symbol='ر.س'>
                                            Saudi Arabia (SAR ر.س)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='RS' data-value="RS" data-name="RSD" data-symbol='РСД'>
                                            Serbia (RSD РСД)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SC' data-value="SC" data-name="SCR" data-symbol='₨'>
                                            Seychelles (SCR ₨)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SL' data-value="SL" data-name="SLL" data-symbol='Le'>
                                            Sierra Leone (SLL Le)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SG' data-value="SG" data-name="SGD" data-symbol='$'>
                                            Singapore (SGD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SX' data-value="SX" data-name="ANG" data-symbol='ƒ'>
                                            Sint Maarten (ANG ƒ)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SK' data-value="SK" data-name="EUR" data-symbol='€'>
                                            Slovakia (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SI' data-value="SI" data-name="EUR" data-symbol='€'>
                                            Slovenia (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SB' data-value="SB" data-name="SBD" data-symbol='$'>
                                            Solomon Islands (SBD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='ZA' data-value="ZA" data-name="ZAR" data-symbol='R'>
                                            South Africa (ZAR R)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='KR' data-value="KR" data-name="KRW" data-symbol='₩'>
                                            South Korea (KRW ₩)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='ES' data-value="ES" data-name="EUR" data-symbol='€'>
                                            Spain (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='LK' data-value="LK" data-name="LKR" data-symbol='₨'>
                                            Sri Lanka (LKR ₨)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='BL' data-value="BL" data-name="EUR" data-symbol='€'>
                                            St. Barthélemy (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SH' data-value="SH" data-name="SHP" data-symbol='£'>
                                            St. Helena (SHP £)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='KN' data-value="KN" data-name="XCD" data-symbol='$'>
                                            St. Kitts &amp; Nevis (XCD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='LC' data-value="LC" data-name="XCD" data-symbol='$'>
                                            St. Lucia (XCD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='MF' data-value="MF" data-name="EUR" data-symbol='€'>
                                            St. Martin (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='VC' data-value="VC" data-name="XCD" data-symbol='$'>
                                            St. Vincent &amp; Grenadines (XCD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SR' data-value="SR" data-name="SRD" data-symbol='$'>
                                            Suriname (SRD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='SE' data-value="SE" data-name="SEK" data-symbol='kr'>
                                            Sweden (SEK kr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='CH' data-value="CH" data-name="CHF" data-symbol='CHF'>
                                            Switzerland (CHF CHF)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TW' data-value="TW" data-name="TWD" data-symbol='$'>
                                            Taiwan (TWD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TZ' data-value="TZ" data-name="TZS" data-symbol='Sh'>
                                            Tanzania (TZS Sh)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TH' data-value="TH" data-name="THB" data-symbol='฿'>
                                            Thailand (THB ฿)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TL' data-value="TL" data-name="USD" data-symbol='$'>
                                            Timor-Leste (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TG' data-value="TG" data-name="XOF" data-symbol='Fr'>
                                            Togo (XOF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TO' data-value="TO" data-name="TOP" data-symbol='$'>
                                            Tonga (TOP T$)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TT' data-value="TT" data-name="TTD" data-symbol='$'>
                                            Trinidad &amp; Tobago (TTD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TN' data-value="TN" data-name="USD" data-symbol='$'>
                                            Tunisia (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TR' data-value="TR" data-name="TRY" data-symbol='₺'>
                                            Türkiye (TRY ₺)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TM' data-value="TM" data-name="USD" data-symbol='$'>
                                            Turkmenistan (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TC' data-value="TC" data-name="USD" data-symbol='$'>
                                            Turks &amp; Caicos Islands (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='TV' data-value="TV" data-name="AUD" data-symbol='$'>
                                            Tuvalu (AUD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='UG' data-value="UG" data-name="UGX" data-symbol='USh'>
                                            Uganda (UGX USh)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='AE' data-value="AE" data-name="AED" data-symbol='د.إ'>
                                            United Arab Emirates (AED د.إ)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='GB' data-value="GB" data-name="GBP" data-symbol='£'>
                                            United Kingdom (GBP £)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" aria-current="true" onClick={handleClickedCurrency} id='US' data-value="US" data-name="USD" data-symbol='$'>
                                            United States (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='UY' data-value="UY" data-name="UYU" data-symbol='$'>
                                            Uruguay (UYU $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='UZ' data-value="UZ" data-name="UZS" data-symbol='UZS'>
                                            Uzbekistan (UZS)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='VU' data-value="VU" data-name="VUV" data-symbol='Vt'>
                                            Vanuatu (VUV Vt)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='VA' data-value="VA" data-name="EUR" data-symbol='€'>
                                            Vatican City (EUR €)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='VE' data-value="VE" data-name="USD" data-symbol='$'>
                                            Venezuela (USD $)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='VN' data-value="VN" data-name="VND" data-symbol='₫'>
                                            Vietnam (VND ₫)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='WF' data-value="WF" data-name="XPF" data-symbol='Fr'>
                                            Wallis &amp; Futuna (XPF Fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='ZM' data-value="ZM" data-name="ZMW" data-symbol='ZK'>
                                            Zambia (ZMW ZK)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedCurrency} id='ZW' data-value="ZW" data-name="USD" data-symbol='$'>
                                            Zimbabwe (USD $)
                                        </Link>
                                    </li>
                                </ul>)}
                            </form>
                        </li>
                        <li id='region_selection' className='flex gap-7 align-baseline'>
                            <span className='font-bold'>Language</span>
                            <form>
                                <button type='button' onClick={toggleRegionSelectorList}>{selectedRegion.region} {isLang_selection ? <IoIosArrowUp className="text-base" /> : <IoChevronForward className="text-base" />}</button>
                                {isLang_selection && (<ul role="list" className={`countryList disclosure__list left-1/3 max-sm:left-full max-sm:shadow-lg block`}>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="de">
                                            German (de)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="en-gb">
                                            English (en-gb)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="en-us">
                                            English (en-us)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="es">
                                            Spanish (es)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="ad">
                                            Catalan (ad)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="fr">
                                            French (fr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="it">
                                            Italian (it)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="hy">
                                            Armenian (hy)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="az">
                                            Azerbaijani (az)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="be">
                                            Belarusian (be)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="ru">
                                            Russian (ru)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="bs">
                                            Bosnian (bs)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="hr">
                                            Croatian (hr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="gd">
                                            Scots Gaelic (gd)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="sr">
                                            Serbian (sr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="bg">
                                            Bulgarian (bg)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="el">
                                            Greek (el)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="cs">
                                            Czech (cs)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="da">
                                            Danish (da)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="et">
                                            Estonian (et)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="fi">
                                            Finnish (fi)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="ka">
                                            Georgian (ka)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="hu">
                                            Hungarian (hu)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="is">
                                            Icelandic (is)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="ga">
                                            Irish (ga)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="kk">
                                            Kazakh (kk)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="sq">
                                            Albanian (sq)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="lv">
                                            Latvian (lv)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="lv">
                                            Lithuanian (lv)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="lb">
                                            Luxembourgish (lb)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="mt">
                                            Maltese (mt)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="nl">
                                            Dutch (nl)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="mk">
                                            Macedonian (mk)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="no">
                                            Norwegian (no)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="pl">
                                            Polish (pl)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="pt">
                                            Portuguese (pt)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="ro">
                                            Romanian (ro)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="sk">
                                            Slovak (sk)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="sl">
                                            Slovenian (sl)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="sv">
                                            Swedish (sv)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="sv">
                                            Turkish (tr)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="uk">
                                            Ukrainian (uk)
                                        </Link>
                                    </li>
                                    <li className="disclosure__item" tabIndex={-1}>
                                        <Link to="#" onClick={handleClickedRegion} data-value="cy">
                                            Welsh (cy)
                                        </Link>
                                    </li>
                                </ul>)
                                }
                            </form>
                        </li>
                    </ul>
                    <ul type="none" className='flex gap-x-5 max-sm:justify-evenly max-sm:w-full'>
                        <li><a href="#"><FaTiktok className='w-5 max-sm:w-6 h-5 max-sm:h-6' /></a></li>
                        <li><a href="#"><FaFacebookF className='w-5 max-sm:w-6 h-5 max-sm:h-6' /></a></li>
                        <li><a href="#"><FaInstagram className='w-5 max-sm:w-6 h-5 max-sm:h-6' /></a></li>
                        <li><a href="#"><FaXTwitter className='w-5 max-sm:w-6 h-5 max-sm:h-6' /></a></li>
                        <li><a href="#"><FaPinterest className='w-5 max-sm:w-6 h-5 max-sm:h-6' /></a></li>
                        <li><a href="#"><FaYoutube className='w-5 max-sm:w-6 h-5 max-sm:h-6' /></a></li>
                        <li><a href="#"><FaLinkedinIn className='w-5 max-sm:w-6 h-5 max-sm:h-6' /></a></li>
                    </ul>
                </div>
            </div>
            <section className='w-screen py-5 px-10 border-t-2 border-gray-300 leading-[normal]'>
                @ Copyright | All Rights reserved
            </section>
        </footer>
    )
}

export default Footer